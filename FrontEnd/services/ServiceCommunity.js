import React from "react";

export const deletePostById = async (postId) => {
  try {
    const token = await AsyncStorage.getItem("@Auth:token")
    const response  = await api.delete(`/post/posts/${postId}`)
  } catch (error) {}
};
