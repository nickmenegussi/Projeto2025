import { useEffect, useState } from "react";
import { getCart, getCartById } from "../services/cartService";

export default function useCart({idUser, idLibrary} = {}) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        let result 
      if(idUser && idLibrary){
        result = await getCartById({idUser, idLibrary})
      } else {
        result = await getCart()
      }
        setData(result);
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
