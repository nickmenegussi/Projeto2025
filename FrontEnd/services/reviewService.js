import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { Alert } from "react-native";
import { router } from "expo-router";
import { handleApiError } from "../utils/handleApiError";

export const getReview = async (sortOrderValue) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token")
    const response = await api.get(
      `/review/reviewSociety?sortOrder=${sortOrderValue}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error)
    return null
  }
}
export const RegisterReview = async (reviewData) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token")
    const response = await api.post(
      "/review/reviewSociety/create",
      reviewData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    Alert.alert("Sucesso", response.data.message)
    return response.data.data
  } catch (error) {
    handleApiError(error)
    return null
  }
}

export const DeleteReview = async (idReviewSociety, userId) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token")
    const response = await api.delete(
      `/review/reviewSociety/${idReviewSociety}/delete`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId: userId,
        },
      }
    )
    Alert.alert("Sucesso", response.data.message)
    return response.data.data
  } catch (error) {
    handleApiError(error)
    return null
  }
}

export const UpdateReview = async (reviewData, idReviewSociety) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token")
    const response = await api.put(
      `/review/reviewSociety/${idReviewSociety}/update`,
      reviewData, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    Alert.alert("Sucesso", response.data.message)
    return response.data.data
  } catch (error) {
    handleApiError(error)
  }
}