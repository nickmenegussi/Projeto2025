import { useEffect, useState } from "react";
import { fetchPosts } from "../services/ServicePost";
import socket from "../services/socket";

export default function usePostMessage() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await fetchPosts();

        if (response?.success && Array.isArray(response.data)) {
          setPostData(response.data);
        } else {
          setPostData([]);
        }
      } catch (err) {
        console.error("Erro ao buscar os posts:", err);
        setError("Não foi possível carregar os posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPosts();

    // 🔴 EVENTO: quando um post for criado no servidor
    socket.on("postCreated", (newPost) => {
      console.log("📡 Novo post recebido via socket:", newPost);
      setPostData((prevPosts) => [newPost, ...prevPosts]); // adiciona no topo
    });

    // 🔴 EVENTO: quando um post for deletado no servidor
    socket.on("postDeleted", ({ id }) => {
      console.log("🗑️ Post deletado via socket:", id);
      setPostData((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });

    // Cleanup: remove listeners ao desmontar
    return () => {
      socket.off("postCreated");
      socket.off("postDeleted");
    };
  }, []);

  return { postData, loading, error };
}
