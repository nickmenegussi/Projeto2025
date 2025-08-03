import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleApiError } from "../utils/handleApiError";
import api from "./api";
import { Alert } from "react-native";

export const createPost = async (image, content, topicId) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", {
      uri: image,
      name: `photo_${Date.now()}.jpg`,
      type: "image/jpeg", // adapte o tipo conforme a imagem
    });
    formData.append("Topic_idTopic", topicId);

    const response = await api.post(`/post/postMessages`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "multipart/form-data",
      },
    });
    Alert.alert("Sucesso", "Post adicionado com sucesso!");

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchPosts = async () => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get("/post/postMessages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
