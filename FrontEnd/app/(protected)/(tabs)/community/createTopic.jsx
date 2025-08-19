import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { FileText, ImageIcon } from "lucide-react-native";
import { CreateTopicForPost } from "../../../../services/ServiceTopic";
import api from "../../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const CreateTopic = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(0);
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão negada",
            "Precisamos da permissão para acessar a galeria."
          );
        }
      }
    })();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem("@Auth:token");
        const response = await api.get("/category/category", {
          headers: {
          Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.data)
      } catch (error) {

        Alert.alert("Erro", "Não foi possivel acessar o servidor.");
      }
    };
    fetchCategories();
  }, []);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erro ao abrir galeria:", error);
      Alert.alert("Erro", "Não foi possível abrir a galeria.");
    }
  };

  const handleCreateTopic = async (image, title, content, Category_id) => {
    try {
      if (!title.trim() && !content.trim()) {
        Alert.alert("Atenção", "Preencha todas as informações");
        return;
      }

      await CreateTopicForPost(image, title, content, Category_id);
      // setTitle("");
      // setContent("");
      // setSelectedImage(null);
    } catch (error) {
      console.error("Erro ao criar um tópico:", error);
      Alert.alert(
        "Erro ao criar um tópico",
        "Não foi possível criar um tópico."
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back("")}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        {/* o !content.trim() ele faz com que se o conteudo estiver vazio ele execute algo depois da verificação */}
        <TouchableOpacity
          style={[
            styles.buttonTweet,
            !content.trim() && !title.trim() && { backgroundColor: "#88C9F9" },
          ]}
          onPress={() => handleCreateTopic(selectedImage, title, content, selected)}
          disabled={!content.trim() && !title.trim()}
        >
          <Text style={styles.tweetText}>Tweet</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo do post */}
      <View style={styles.contentArea}>
        <Image
          source={require("../../../../assets/images/default-profile.jpg")}
          style={styles.avatar}
        />
        <View style={{ flexDirection: "column", flex: 1, gap: 15 }}>
          <Text style={{ fontSize: 16, color: "white" }}>Título *</Text>
          <TextInput
            placeholder="Título da Mensagem"
            multiline
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholderTextColor="#FFFFFF"
            style={styles.TitleInput}
          />
          <Text style={{ fontSize: 16, color: "white" }}>
            Escolha a Categoria *
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
            selectedValue={selected}
            style={styles.picker}
            onValueChange={(itemValue) => setSelected(itemValue)}
          >
            {categories.length > 0
              ? categories.map((item) => (
                  <Picker.Item
                    key={item.idCategory}
                    label={item.nameCategory}
                    value={item.idCategory}
                  /> 
              ))
              :   <Picker.Item label="Nenhuma categoria encontrada" value="" />
}
          </Picker>
          </View>
          <Text style={{ fontSize: 16, color: "white" }}>Mensagem *</Text>
          <TextInput
            placeholder="O que está acontecendo?"
            multiline
            value={content}
            onChangeText={(text) => setContent(text)}
            placeholderTextColor="#FFFFFF"
            style={styles.textInput}
          />
        </View>
      </View>

      {/* Preview da imagem */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}

      <View style={styles.actions}>
        <View style={styles.RowItemImageAndMessage}>
          <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
            <ImageIcon size={30} color={"#003B73"} />
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

export default CreateTopic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    marginBottom: 30,
    marginTop: 35,
    borderBottomColor: "white",
    borderBottomWidth: 0.8,
  },
  buttonTweet: {
    backgroundColor: "#1DA1F2",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  tweetText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
  },
  contentArea: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textInput: {
    flex: 1,
    minHeight: 120,
    fontSize: 16,
    color: "white",
    padding: 10,
    borderColor: "#1DA1F2",
    borderWidth: 1,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  TitleInput: {
    flex: 1,
    minHeight: 50,
    fontSize: 16,
    color: "white",
    padding: 10,
    borderColor: "#1DA1F2",
    borderWidth: 1,
    borderRadius: 8,
    textAlignVertical: "top",
  }, pickerContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#1DA1F2",
    overflow: "hidden", // garante que arredondamento funcione
    
  },
  picker: {
    height: 50,
    width: "100%",
    color: "white", // cor do texto
    backgroundColor: "transparent",
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 140,
    marginBottom: 10,
  },
  actions: {
    position: "absolute",
    bottom: 400,
    left: 20,
    gap: 20,
  },
  RowItemImageAndMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    elevation: 2, //Android
    shadowColor: "#000", //iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textActions: {
    color: "white",
    width: 70,
    fontWeight: "bold",
    textAlign: "center",
  },
});
