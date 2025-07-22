import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleApiError } from "../utils/handleApiError";
import api from "./api";
import { Alert } from "react-native";

export const fecthLikes = async (Post_idPost) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get(`/likes/likes/${Post_idPost}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export const addLikeToPost = async (Post_idPost) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.post(`/likes/likes/${Post_idPost}/create`, {},{
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    Alert.alert("Sucesso,", "você acabou de curtir um post")
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};
