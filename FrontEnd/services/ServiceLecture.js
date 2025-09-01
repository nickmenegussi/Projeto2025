import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { Alert } from "react-native";
import { router } from "expo-router";
import { handleApiError } from "../utils/handleApiError";

export const getLecture = async () => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get("/lectures/lectures", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};
