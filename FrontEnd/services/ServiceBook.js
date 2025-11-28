import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { Alert } from "react-native";
import { router } from "expo-router";
import handleApiError from "../utils/handleApiError";

export const getBooks = async () => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get("/library/library", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data);
        Alert.alert("Erro", error.response.data.message);
        router.push("/sign-up");
      } else {
        console.log("Erro", error.response.data);
        Alert.alert("Erro", error.response.data.message);
      }
    } else {
      console.log("Erro", error);
    }
  }
};

export const getBookById = async (LibraryId) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get(`/library/library/${LibraryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data
  } catch (error) {
    handleApiError(error, true)
  }
}
