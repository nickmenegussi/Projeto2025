import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"
import { Alert } from "react-native"
import { router } from "expo-router"

export default getVolunteerWork = async() => {
    try {
        const token = await AsyncStorage.getItem("@Auth:token");
        const response = await api.get("/volunteerWork/work", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setVolunteerWork(response.data.data);
      } catch (error) {
        if (error.response) {
          if (error.response.data.loginRequired === true) {
            console.log("Sessão expirada", error.response.data.message);
            Alert.alert("Sessão expirada", error.response.data.message);
            router.push("/sign-up");
          } else {
            console.log("Erro ao exibir os trabalhos voluntários", error.response.data);
            Alert.alert("Erro ao exibir os trabalhos voluntários", error.response.data.message);
          }
        } else {
          console.log("Erro ao exibir os trabalhos voluntários", error);
        }
      }
}