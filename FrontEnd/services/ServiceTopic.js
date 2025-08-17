import AsyncStorage from "@react-native-async-storage/async-storage";
import handleApiError from "../utils/handleApiError";
import api from "./api";
import { Alert } from "react-native";

export const CreateTopicForPost = async (image, title, description, Category_id) => {
    
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", {
      uri: image,
      name: `photo_${Date.now()}.jpg`,
      type: "image/jpeg",
    });
    formData.append("Category_id", Category_id)

    const response = await api.post("/topic/topic/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    Alert.alert("Sucesso", "Tópico adicionado com sucesso!");
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
