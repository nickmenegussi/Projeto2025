import { useCallback, useEffect, useState } from "react";
import { getCart, getCartById } from "../services/ServiceCart";

export default function useCart({idUser, idLibrary} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
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
    })
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return { data, loading, refresh: fetchCart };
}
