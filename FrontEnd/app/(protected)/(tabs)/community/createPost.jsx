import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { FileText, ImageIcon } from "lucide-react-native";
import { createPost } from "../../../../services/ServicePost";

const CreatePost = () => {
  const [content, setContent] = useState("");

  const handleTweetPost = async (image, content, Topic_idTopic) => {
    try {
      if (!content.trim()) {
        await createPost(content, image, Topic_idTopic);
        setContent("");
        Alert.alert("Sucesso", "Carrinho deletado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
      Alert.alert("Erro", "Não foi possível criar um post.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTweet}>
          <Text style={styles.tweetText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentArea}>
        <Image
          source={require("../../../../assets/images/default-profile.jpg")}
          style={styles.avatar}
        />
        <TextInput
          placeholder="What's happening?"
          multiline
          placeholderTextColor="#FFFFFF" // <-- Adicione isso!
          style={styles.textInput}
        />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <ImageIcon size={20} color={"#003B73"} />
          <Text style={styles.textActions}>Add Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FileText color="#003B73" size={20} />

          <Text style={styles.textActions}>Add GIF</Text>
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  tweetText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
  },
  contentArea: {
    flexDirection: "row",
    color: "white",
    justifyContent: "",
    alignItems: "center",
    gap: 30,
  },

  textInput: {
    height: 100,
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  actions: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  actionText: {
    marginLeft: 8,
    color: "#003B73",
    fontWeight: "bold",
  },
  textActions: {
    marginLeft: 8,
    color: "#003B73",
    fontWeight: "bold",
  },
});
