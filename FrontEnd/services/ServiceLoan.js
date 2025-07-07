import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"
import { router } from "expo-router"
import { Alert } from "react-native"

export const createLoanConfirmation = async ({Cart_idCart, Book_idLibrary, User_idUser, quantity}) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token")
    const response = await api.post(
      `/loan/loan/${Cart_idCart}/register`, { Book_idLibrary, User_idUser, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    Alert.alert('Sucesso', 'empréstimo confirmado com sucesso!')
    router.push('/library/MessageLoanConfirmed')
    return response.data.data
  } catch (error) {
    if (error.response) {
      if (error.response.data.loginRequired === true) {
        console.log("Erro", error.response.data)
        Alert.alert("Erro", error.response.data.message)
        router.push("/sign-up")
      } else {
        console.log("Erro", error.response.data)
        Alert.alert("Erro", error.response.data.message)
      }
    } else {
      console.log("Erro", error)
    }
  }
}
