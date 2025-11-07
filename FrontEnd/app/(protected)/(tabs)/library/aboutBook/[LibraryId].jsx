import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, Bookmark, Share2, Star } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Trending from "../../../../../components/Navagation";
import ButtonIcons from "../../../../../components/ButtonIcons";
import { addFavorite } from "../../../../../services/ServiceFavorite";
import useBookDetail from "../../../../../hooks/useBookDetail";

const AboutBook = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useLocalSearchParams();
  const libraryId = params.LibraryId;
  const { book, loading, error } = useBookDetail(libraryId)
  
  const handleAddFavorite = async () => {
    if (!book) return;
    try {
      await addFavorite(book.idLibrary);
      Alert.alert("Sucesso", "Livro favoritado com sucesso!");
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", `${error.message}`);
    }
  };

  const handleBookLoanNavigation = () => {
    if (!book[0]) return;
    const bookType = book[0].bookCategory === "emprestimo" ? "emprestimo" : "reserva";
    router.push(`/library/bookType/${book[0].idLibrary}?type=${bookType}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Carregando livro...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !book) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Livro não encontrado</Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => router.back()}
          >
            <Text style={styles.errorButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const imageUrl = book[0].image
    ? { uri: `http://192.168.1.12:3001/uploads/${book[0].image}` }
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ImageBackground
          source={imageUrl}
          style={styles.coverImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,59,115,0.8)", "rgba(0,59,115,0.5)", "transparent"]}
            style={styles.gradient}
          />

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <ArrowLeftIcon size={28} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <ButtonIcons
                color="#ffff"
                size={30}
                handleChange={() => {
                  setIsFavorite(!isFavorite);
                  handleAddFavorite();
                }}
                Icon={({ color, size }) => (
                  <Bookmark
                    color={color}
                    fill={isFavorite ? "#ffff" : "transparent"}
                    size={size}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{book[0].nameBook}</Text>
            <Text style={styles.bookAuthor}>{book[0].authorBook}</Text>

            <View style={styles.ratingContainer}>
              <Star size={16} fill="#FFD700" color="#FFD700" />
              <Text style={styles.ratingText}>Nota: 4.0</Text>
            </View>

            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {book[0].bookCategory === "emprestimo"
                    ? "Empréstimo"
                    : "Reserva"}
                </Text>
                
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{book[0].tagsBook}</Text>
              </View>
              {book[0].status_Available === "disponível" &&
              book[0].bookQuantity > 0 ? (
                <View style={[styles.tag, styles.availableTag]}>
                  <Text style={styles.tagText}>Disponível</Text>
                </View>
              ) : (
                <View style={[styles.tag, styles.unavailableTag]}>
                  <Text style={styles.tagText}>Indisponível</Text>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Navegação</Text>
          <Trending
            navagations={[
              { name: "Sobre o livro" },
              {
                name:
                  book[0].bookCategory === "emprestimo"
                    ? "Empréstimo de livro"
                    : "Reserva de livro",
                onPress: handleBookLoanNavigation,
              },
              {
                name: "Feedbacks",
                path: `/library/reviewBook/${book[0].idLibrary}`,
              },
            ]}
          />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre o Livro</Text>
            <Text style={styles.sectionText}>{book[0].overviewBook}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Curiosidade do livro</Text>
            <Text style={styles.sectionText}>{book[0].curiosityBook}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Adicione estes estilos aos existentes
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
  loadingText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
    padding: 20,
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  errorButton: {
    backgroundColor: "#60A3D9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 16,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#60A3D9",
  },
  availableTag: {
    backgroundColor: "#A8DF8E", // Verde pastel suave
    borderColor: "rgba(31, 110, 31, 0.5)",
    color: "#1F6E1F",
  },
  unavailableTag: {
    backgroundColor: "rgba(255, 155, 155, 0.7)",
    borderColor: "rgba(139, 0, 0, 0.5)",
  },
  tagText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    backgroundColor: "#003B73",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
    paddingBottom: "50%",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    textAlign: "justify",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  container: {
    flex: 1,
  },
  coverImage: {
    width: "100%",
    height: 500,
    justifyContent: "space-between",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 15,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  bookInfo: {
    padding: 20,
    paddingBottom: 30,
  },
  bookTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bookAuthor: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 15,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
});

export default React.memo(AboutBook);
