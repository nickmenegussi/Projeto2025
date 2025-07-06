import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { Alert } from "react-native";
import { router } from "expo-router";

export const addToCart = async ({ bookId, action, quantity }) => {
  try {
    console.log(quantity)
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.post(
      "/cart/cart/register",
      {
        Book_idLibrary: bookId,
        action,
        quantity: quantity
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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

export const getCart = async () => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get("/cart/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
}

export const getCartById = async ({idUser, idLibrary}) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get(`/cart/cart/user/${idUser}/library/${idLibrary}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
}

export const updateQuantity = async ({Book_idLibrary, quantity}) => {
   try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.patch(`/cart/cart/quantity`, {
      Book_idLibrary: Book_idLibrary,
      quantity: quantity
    } ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
}

export const deleteBookInCart = async ({idCart}) => {
try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.delete(`/cart/cart/${idCart}` ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
}