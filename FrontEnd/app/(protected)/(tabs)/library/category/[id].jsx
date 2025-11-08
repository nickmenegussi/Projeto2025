// app/library/reflections/category/[id].js
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import ReflectionCard from "../../../../../components/MotivationalCard";

const CategoryReflections = () => {
  const { id } = useLocalSearchParams();
  
  const categoryData = {
    motivacional: {
      name: "Motivacional",
      reflections: [
        {
          id: '1',
          quote: "Acredite você pode chegar lá. Persista, não importa o quão difícil possa parecer.",
          author: "Desconhecido",
          company: "",
          hashtag: "#MOTIVAÇÃO"
        },
        {
          id: '2',
          quote: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
          author: "Albert Einstein",
          company: "Cientista",
          hashtag: "#TRABALHO_DURO"
        }
      ]
    },
    filosofia: {
      name: "Filosofia",
      reflections: [
        {
          id: '3',
          quote: "Conhece-te a ti mesmo e conhecerás o universo e os deuses.",
          author: "Sócrates",
          company: "Filósofo",
          hashtag: "#AUTOCONHECIMENTO"
        }
      ]
    }
    // Adicione mais categorias conforme necessário
  };

  const category = categoryData[id] || categoryData.motivacional;

  const navigateToReflection = (reflectionId) => {
    router.push(`/library/reflections/${reflectionId}`);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFFFFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={category.reflections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReflectionCard
            quote={item.quote}
            author={item.author}
            company={item.company}
            hashtag={item.hashtag}
            onPress={() => navigateToReflection(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#003B73",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 32,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});

export default CategoryReflections;