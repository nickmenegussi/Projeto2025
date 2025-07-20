import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleApiError } from "../utils/errorHandler";
import api from "./api";

export const createPost = async (content, image, topicId) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    formData.append("Topic_idTopic", topicId);

    const response = await api.post(`/post/post/register`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "Content-Type": "multipart/form-data",
    })
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
