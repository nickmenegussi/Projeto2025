import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createComment, fetchPostAndComments, getCommentById } from "../services/ServiceComments";
import api from "../services/api";

export default function useComments(postId) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      fetchPostComments();
    }
  }, [postId]);

  const fetchPostComments = async () => {
    try {
      const postResponse = await api.get(`/post/postMessages/${postId}`);
      setPost(postResponse.data.data);

      const commentsResponse = await getCommentById(postId)
      setComments(commentsResponse)
    } catch (error) {
      console.log('Erro ao buscar post e comentários:', error);
    } finally {
        setLoading(false)
    }
  };

  const addLocalComment = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  return {
    post,
    comments,
    loading, refetch: fetchPostComments, addLocalComment
  };
}
