// app/library/reflections/index.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import ReflectionCard from "../../../../components/MotivationalCard";

const ReflectionsHome = () => {
  const categories = [
    { id: 'motivacional', name: 'Motivacional', color: '#60A3D9' },
    { id: 'filosofia', name: 'Filosofia', color: '#4ECDC4' },
    { id: 'negocios', name: 'Negócios', color: '#FF6B6B' },
    { id: 'espiritual', name: 'Espiritual', color: '#FFD93D' },
    { id: 'vida', name: 'Vida', color: '#6BCF7F' },
    { id: 'sucesso', name: 'Sucesso', color: '#9B59B6' },
  ];

  const featuredReflections = [
    {
      id: '1',
      quote: "O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo. Mesmo não atingindo o alvo, quem busca e vence obstáculos, no mínimo fará coisas admiráveis.",
      author: "José de Alencar",
      company: "Escritor",
      hashtag: "#DETERMINAÇÃO",
      category: 'motivacional'
    },
    {
      id: '2',
      quote: "A vida é o que acontece enquanto você está ocupado fazendo outros planos.",
      author: "John Lennon",
      company: "Músico",
      hashtag: "#VIDA",
      category: 'vida'
    },
    {
      id: '3',
      quote: "O insucesso é apenas uma oportunidade para recomeçar com mais inteligência.",
      author: "Henry Ford",
      company: "Empresário",
      hashtag: "#RESILIÊNCIA",
      category: 'negocios'
    }
  ];

  const navigateToCategory = (categoryId) => {
    router.push(`/library/reflections/category/${categoryId}`);
  };

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
        <Text style={styles.headerTitle}>Reflexões</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => navigateToCategory(category.id)}
            >
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reflexões em Destaque */}
        <Text style={styles.sectionTitle}>Em Destaque</Text>
        <View style={styles.featuredContainer}>
          {featuredReflections.map((reflection) => (
            <ReflectionCard
              key={reflection.id}
              quote={reflection.quote}
              author={reflection.author}
              company={reflection.company}
              hashtag={reflection.hashtag}
              onPress={() => navigateToReflection(reflection.id)}
            />
          ))}
        </View>

        {/* Reflexões do Dia */}
        <Text style={styles.sectionTitle}>Reflexão do Dia</Text>
        <ReflectionCard
          quote="Be fearful when others are greedy and to be greedy only when others are fearful."
          author="Warren Buffett"
          company="Berkshire Hathaway"
          hashtag="#REFLEXÃO_DO_DIA"
        />

        {/* Minhas Reflexões Favoritas */}
        <Text style={styles.sectionTitle}>Minhas Favoritas</Text>
        <View style={styles.favoritesContainer}>
          <Text style={styles.emptyText}>
            Você ainda não tem reflexões favoritas
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigateToCategory('motivacional')}
          >
            <Text style={styles.exploreButtonText}>Explorar Reflexões</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  searchButton: {
    padding: 4,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  featuredContainer: {
    gap: 16,
  },
  favoritesContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#CCCCCC",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: "#60A3D9",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ReflectionsHome;