import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchPostAndComments } from "../services/ServiceComments";
import api from "../services/api";
import handleApiError from "../utils/handleApiError";

export default function useComments(postId) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPostComments();
    }
  }, [postId]);

  const fetchPostComments = async () => {
    try {
      const postResponse = await api.get(`/post/post/${postId}`);
      setPost(postResponse.data.data);

      const commentsResponse = await api.get(`/comments/comments/${postId}`)
      setComments(commentsResponse.data.data)
    } catch (error) {
      console.log('Erro ao buscar post e comentários:', error);
    } finally {
        setLoading(false)
    }
  };

  return {
    post,
    comments,
    newCommentContent,
    setNewCommentContent,
    loading,
    isSubmittingComment,
    setIsSubmittingComment,
  };
}
