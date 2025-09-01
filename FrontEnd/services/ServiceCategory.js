import { View, Text, Alert } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import  handleApiError  from "../utils/handleApiError";

export const getCategories = async () => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get("/category/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    Alert.alert("Erro", "Não foi possivel acessar o servidor.");
  }
};

export const getCategoriesByCategory = async (category) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get(`/category/category/${category.nameCategory}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data
  } catch (error) {
    handleApiError(error)
  }
};
