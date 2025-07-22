import AsyncStorage from "@react-native-async-storage/async-storage"
import { handleApiError } from "../utils/handleApiError";
import api from "./api";

export const fecthLikes = () => {
    try {
        const token = AsyncStorage.getItem("@Auth:token")
        const resposne = await api.get('')
    } catch (error) {
        handleApiError(error)
        return null
    }
}
const response = await api.get("/lectures/lectures", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }