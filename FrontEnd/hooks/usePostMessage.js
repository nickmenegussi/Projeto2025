import { useCallback, useEffect, useState } from "react";
import { fetchPosts } from "../services/ServicePost";
import socket from "../services/socket";

export default function usePostMessage() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitialPosts = useCallback(async () => {
      try {
        const post = await fetchPosts();

        if (post) {
          setPostData(post.data);
        } else {
          setPostData([]);
        }
      } catch (err) {
        console.error("Erro ao buscar os posts:", err);
        setError("Não foi possível carregar os posts.");
      } finally {
        setLoading(false);
      }
    }, [])

   

  return { postData, setPostData, loading, error };
}
