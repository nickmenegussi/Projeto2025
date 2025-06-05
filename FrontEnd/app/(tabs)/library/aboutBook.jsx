import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, Bookmark, Share2, Star } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Rating } from "react-native-ratings";
import CustomNavagation from "../../../components/CustomNavagation";
import Trending from "../../../components/Navagation";
import ButtonIcons from "../../../components/ButtonIcons";



const aboutBook = () => {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useLocalSearchParams();
  const booksUnique = params.data ? JSON.parse(params.data) : [];
  const book = booksUnique[0] || {
    nameBook: "Título não disponível",
    authorBook: "Autor desconhecido",
    overviewBook: "Sinopse não disponível",
    curiosityBook: "Nenhuma curiosidade disponível",
    image: null,
    tagsBook: "Sem tags",
    bookCategory: "",
    status_Available: "",
    bookQuantity: 0
  };

  const imageUrl = book.image 
    ? { uri: `http://192.168.1.17:3001/uploads/${book.image}` }
    : null;


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {/* Imagem de fundo com gradiente */}
        <ImageBackground
          source={imageUrl}
          style={styles.coverImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,59,115,0.8)', 'rgba(0,59,115,0.5)', 'transparent']}
            style={styles.gradient}
          />
          
          {/* Cabeçalho */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <ArrowLeftIcon size={28} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.actionButton}
              >
                <Share2 size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <ButtonIcons
              color="#ffff"
              size={30}
              handleChange={() => setIsFavorite(!isFavorite)}
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
          
          {/* Informações do livro */}
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{book.nameBook}</Text>
            <Text style={styles.bookAuthor}>{book.authorBook}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} fill="#FFD700" color="#FFD700" />
              <Text style={styles.ratingText}>Nota: 4.0</Text>
            </View>
            
            <View style={styles.tagsContainer}>
              {book.bookCategory === "empréstimo" && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Encomenda</Text>
                </View>
              )}
              <View style={styles.tag}>
                <Text style={styles.tagText}>{book.tagsBook}</Text>
              </View>
              {book.status_Available === "disponível" && book.bookQuantity > 0 ? (
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

        {/* Conteúdo principal */}
        <View style={styles.content}>
          {/* Navegação */}
          <Text style={styles.sectionTitle}>Navegação</Text>
          <Trending
            navagations={[
              { name: "Sobre o livro" },
              { name: "Empréstimo de livro", path: "/library/bookLoan" , data: booksUnique},
              { name: "Feedbacks", path: "/library/reviewBook" },
            ]}
          />
          
          {/* Seções de conteúdo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre o Livro</Text>
            <Text style={styles.sectionText}>{book.overviewBook}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Curiosidade do livro</Text>
            <Text style={styles.sectionText}>{book.curiosityBook}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  container: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 500,
    justifyContent: 'space-between',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    padding: 20,
    paddingBottom: 30,
  },
  bookTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20

  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#60A3D9",
  },
  availableTag: {
    backgroundColor: "#A8DF8E", // Verde pastel suave
    borderColor: 'rgba(31, 110, 31, 0.5)',
    color: "#1F6E1F", 
 },
  unavailableTag: {
    backgroundColor: 'rgba(255, 155, 155, 0.7)',
    borderColor: 'rgba(139, 0, 0, 0.5)',
  },
  tagText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    backgroundColor: '#003B73',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
    paddingBottom: '50%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    textAlign: 'justify',
  },
});

export default React.memo(aboutBook);