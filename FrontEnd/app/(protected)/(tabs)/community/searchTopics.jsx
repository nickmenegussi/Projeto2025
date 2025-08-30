import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../../services/api";

const SearchTopic = ({ route, navigation }) => {
  const { searchText, selectedCategory } = route.params;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        let response = [];
        if (selectedCategory) {
          const res = await api.get(`/topic/topic?category=${selectedCategory.idCategory}`);
          response = res.data.data || [];
        } else {
          const res = await api.get("/topic/topic");
          response = res.data.data || [];
        }
        const filtered = response.filter(item =>
          item.title.toLowerCase().includes(searchText.toLowerCase().trim())
        );
        setResults(filtered);
      } catch (err) {
        console.log("Erro ao buscar tópicos:", err);
      }
    };

    fetchResults();
  }, [searchText, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Resultados para "{searchText}" ({results.length})
      </Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.idTopic.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#003B73", padding: 10 },
  title: { color: "white", fontSize: 18, marginBottom: 10 },
  item: { backgroundColor: "#0055A5", padding: 15, borderRadius: 8, marginBottom: 10 },
  itemTitle: { color: "white", fontWeight: "700", fontSize: 16 },
  itemDesc: { color: "white", fontSize: 14, marginTop: 5 },
});

export default SearchTopic;
