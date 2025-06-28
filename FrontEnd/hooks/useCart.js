import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";

export default function useCart() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setData(data);
      } catch (error) {
        console.error("Erro ao carregar livros", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  return { data, loading };
}
