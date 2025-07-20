import { router } from "expo-router";
import { Alert } from "react-native";

export const handleApiError = (error) => {
  if (error.response) {
    if (error.response.data.loginRequired === true) {
      console.log("Sessão expirada", error.response.data.message);
      Alert.alert("Sessão expirada", error.response.data.message);
      router.push("/sign-up");
      return null
    } else {
      console.log(
        "Erro ao exibir os dados",
        error.response.data
      );
      Alert.alert(
        "Erro ao exibir os dados",
        error.response.data.message
      );
    }
    return null
  } else {
    console.log("Erro ao exibir os dados", error);
    return null
  }
};
