import { View, Text } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { createPost } from "../services/ServicePost";

export default function usePostMessage() {
  const [postData, setPostaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Simulate fetching post data
        const response = await getPostData()
        setPostaData(data);
      } catch (error) {
        console.error("Erro ao buscar post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, []);
}
