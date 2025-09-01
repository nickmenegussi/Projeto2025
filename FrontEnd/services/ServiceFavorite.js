import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import  handleApiError  from "../utils/handleApiError";

export const addFavorite = async (Book_idLibrary) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.post(
      "/favorite/favorite/register",
      {
        Book_idLibrary,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
}

export const getAllFavoritesByUser = async () => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");
    const response = await api.get(
      "/favorite/favorite/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};