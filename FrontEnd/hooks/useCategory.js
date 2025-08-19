import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { getCategories, getCategoriesByCategory } from "../services/ServiceCategory";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Buscar todas as categorias ao montar
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response || []);
    } catch (error) {
      console.log("Erro ao buscar categorias:", error);
      Alert.alert("Erro no servidor", "Erro ao buscar categorias");
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar tópicos de uma categoria
  const fetchCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      const response = await getCategoriesByCategory(category);
      return response || [];
    } catch (error) {
      console.log("Erro ao buscar tópicos da categoria:", error);
      Alert.alert("Erro no servidor", "Erro ao buscar tópicos da categoria");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, loading, selectedCategory, fetchCategory };
}
