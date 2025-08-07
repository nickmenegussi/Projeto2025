import { router } from "expo-router";
import { Alert } from "react-native";

export default function handleApiError(error)  {
  if(error?.response?.data){
    const data = error.response.data 

    if(data.loginRequired){
      console.log("Sessão expirada:", data.message);
      Alert.alert("Sessão expirada", data.message || "Faça login novamente.");
      router.replace("/sign-up");
      return;
    }

    console.log("Erro da API:", data.data  || data);
    Alert.alert("Erro", data.message || "Ocorreu um erro.");
    return;
  }
  console.log("Erro inesperado:", error);
  Alert.alert("Erro", "Não foi possível conectar ao servidor.");
};
