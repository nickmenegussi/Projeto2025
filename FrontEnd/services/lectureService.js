import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"
import { Alert } from "react-native"
import { router } from "expo-router"

export default getLecture = async() => {
    try {
        const token = await AsyncStorage.getItem("@Auth:token");
        const response = await api.get("/lectures/lectures", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return response.data.data
      } catch (error) {
        if (error.response) {
          if (error.response.data.loginRequired === true) {
            console.log("Sessão expirada", error.response.data.message);
            Alert.alert("Sessão expirada", error.response.data.message);
            router.push("/sign-up");
          } else {
            console.log("Erro o exibir as Palestras", error.response.data);
            Alert.alert("Erro o exibir as Palestras", error.response.data.message);
            return []
          }
        } else {
          console.log("Erro ao exibir as Palestras", error);
          return []
        }
      }
}