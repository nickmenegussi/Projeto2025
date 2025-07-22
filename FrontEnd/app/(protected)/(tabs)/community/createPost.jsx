import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FileText, ImageIcon } from "lucide-react-native";
import { createPost } from "../../../../services/ServicePost";
import * as ImagePicker from "expo-image-picker";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleTweetPost = async (image, content, Topic_idTopic) => {
    try {
      if (!content.trim()) {
        Alert.alert("Atenção", "Digite algum conteúdo!");
        return;
      }

      await createPost(image, content, Topic_idTopic);
      setContent("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Erro ao criar post:", error);
      Alert.alert("Erro ao criar postagem", "Não foi possível criar um post.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        {/* o !content.trim() ele faz com que se o conteudo estiver vazio ele execute algo depois da verificação */}
        <TouchableOpacity
          style={[
            styles.buttonTweet,
            !content.trim() && { backgroundColor: "#88C9F9" },
          ]}
          onPress={() => handleTweetPost(selectedImage, content, 1)}
          disabled={!content.trim()}
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
        <TextInput
          placeholder="O que está acontecendo?"
          multiline
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor="#FFFFFF"
          style={styles.textInput}
        />
      </View>

      {/* Preview da imagem */}
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={styles.selectedImage}
        />
      )}

      {/* Botões de ação */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={pickImage}
        >
          <ImageIcon size={20} color={"#003B73"} />
          <Text style={styles.textActions}>Imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <FileText color="#003B73" size={20} />
          <Text style={styles.textActions}>GIF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;

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
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    flexWrap: "wrap",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 2, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textActions: {
    marginLeft: 8,
    color: "#003B73",
    fontWeight: "bold",
  },
});
 