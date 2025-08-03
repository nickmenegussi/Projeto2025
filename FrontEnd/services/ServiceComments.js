import api from "./api";
import handleApiError from "../utils/handleApiError"

export const fetchPostAndComments = async (postId) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token")
    const response = await api.get(`/comments/comments/:${postId}`, {
        headers: {
        Authorization: "Bearer " + token,
      },
    })
    return response.data
  } catch (error) {
    handleApiError(error)
    return []
  }
};

export const createComment = async (postId, message) => {
    try {
        const token = await AsyncStorage.getItem("@Auth:token")
        const response = await api.post(`/comments/comments/${postId}`, {
            message
        } ,{
            headers: {
            Authorization: "Bearer " + token,
        },
    })
    return response.data
  } catch (error) {
    handleApiError(error)
    return []
  }
}