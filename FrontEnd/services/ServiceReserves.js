import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import handleApiError from "../utils/handleApiError";

// Nova função para buscar reservas
export const getReservationById = async () => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token");

    const response = await api.get("/reserves/reserves/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {data: response.data.data, HasAReserve: response.data.HasAReserve}
  } catch (error) {
    handleApiError(error)
  }
};
