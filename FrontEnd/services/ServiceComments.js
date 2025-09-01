import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import handleApiError from "../utils/handleApiError"
import { Alert } from "react-native";

export const getCommentById = async (postId) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token")
    const response = await api.get(`/comments/comments/${postId}`, {
        headers: {
        Authorization: "Bearer " + token,
      },
    })
    return response.data
  } catch (error) {
    handleApiError(error)
    return []
  }
};

export const createComment = async (postId, message) => {
    try {
        const token = await AsyncStorage.getItem("@Auth:token")
        const response = await api.post(`/comments/comments/${postId}`, {
            message
        } ,{
            headers: {
            Authorization: "Bearer " + token,
        },
    })
    Alert.alert("Suceeso", "post comentado com sucesso.")
    return response.data
  } catch (error) {
    handleApiError(error)
    return []
  }
}