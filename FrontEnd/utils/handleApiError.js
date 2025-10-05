import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export default async function handleApiError(error) {
  if (error?.response?.data) {
    const data = error.response.data;

    if (data.loginRequired) {
      console.log("Sessão expirada:", data.message);
      Toast.show({
      type: "error",
      text1: "Sessão Expirada!" || data.message || "Faça login novamente.",
      position: "bottom",
    });
      await AsyncStorage.clear();
      router.replace("/sign-up");
      return;
    }

    console.log("Erro da API:", data.data || data);
    Toast.show({
      type: "error",
      text1: data.message || "Ocorreu um erro.",
      position: "bottom",
    });
    return;
  }
  console.error("Erro inesperado:", error);
  console.error("Erro inesperado:", error.response.data);
  Toast.show({
      type: "error",
      text1: "Não foi possível conectar ao servidor.",
      position: "bottom",
    });
}
