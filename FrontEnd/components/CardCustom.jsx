import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const {width} = Dimensions.get("window")
const CARD_WIDTH = (width - 48) / 2; // Mantendo sua largura original

export default function CardCustom({
  data,
  loan = false,
  reserves = false,
  aboutBookLoan = false,
  aboutBookReserves = false,
  obrasComplementares = false,
  obrasBasicas = false,
}) {
  const [books, setBooks] = useState(data || []);

  useEffect(() => {
    setBooks(data || []);
  }, [data]);

  const handleCardPress = (item) => {
    if (aboutBookLoan) {
      const encodedData = encodeURIComponent(JSON.stringify([item]));
      router.push(`/library/aboutBook?data=${encodedData}`);
    } else if (loan) {
      const encodedData = encodeURIComponent(JSON.stringify(books));
      router.push(`/library/LoanCollection?data=${encodedData}`);
    } else if (aboutBookReserves) {
      const encodedData = encodeURIComponent(JSON.stringify([item]));
      router.push(`/library/aboutBook?data=${encodedData}`);
    } else if (reserves) {
      const encodedData = encodeURIComponent(JSON.stringify(books));
      router.push(`/library/ReserveCollection?data=${encodedData}`);
    } else if (obrasComplementares) {
      router.push(`/library/ObrasComplementares`);
    } else if (obrasBasicas) {
      router.push(`/library/ObrasBasicas`);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {books.length > 0 ? (
        books.map((item) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            key={item.idLibrary}
            onPress={() => handleCardPress(item)}
          >
            <ImageBackground
              source={{ uri: `http://192.168.1.10:3001/uploads/${item.image}` }}
              style={styles.image}
              resizeMode="cover"
              imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.imageOverlay}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.bookCategory}</Text>
              </View>
            </ImageBackground>

            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.nameBook}
              </Text>
              <Text style={styles.author} numberOfLines={1}>
                {item.authorBook}
              </Text>

              <View style={styles.ratingContainer}>
                <Star size={16} color="#facc15" fill="#facc15" />
                <Text style={styles.rating}>4.5</Text>
              </View>

              {/* Tags totalmente visíveis */}
              <View style={styles.tagsContainer}>
                {item.tagsBook && (
                  <Text style={styles.tagsText}>{item.tagsBook}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleCardPress(item)}
              >
                <Text style={styles.buttonText}>Ver mais</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <ActivityIndicator size="large" color="#3b82f6" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12, // Seu border radius original
    shadowColor: "#000",
    shadowOpacity: 0.1, // Seu valor original
    shadowOffset: { width: 0, height: 2 }, // Seu valor original
    shadowRadius: 6, // Seu valor original
    elevation: 4, // Seu valor original
    overflow: "hidden",
    width: CARD_WIDTH, // Sua largura original
    marginRight: 7, // Seu margin original
  },
  image: {
    width: "100%",
    height: 130, // Sua altura original
    justifyContent: "flex-end",
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3b82f6",
  },
  infoContainer: {
    padding: 10, // Seu padding original
  },
  title: {
    fontSize: 18, // Seu tamanho original
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4, // Seu margin original
  },
  author: {
    fontSize: 14, // Seu tamanho original
    color: "#6b7280",
    marginBottom: 8, // Seu margin original
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4, // Seu margin original
  },
  rating: {
    fontSize: 14, // Seu tamanho original
    color: "#facc15",
    marginLeft: 4, // Seu margin original
  },
  tagsContainer: {
    marginBottom: 12, // Espaçamento similar ao original
  },
  tagsText: {
    fontSize: 12, // Seu tamanho original
    color: "#6b7280",
    fontStyle: "italic",
    flexShrink: 1, // Permite que o texto quebre em múltiplas linhas
    flexWrap: "wrap", // Permite quebra de linha
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8, // Seu padding original
    borderRadius: 8, // Seu border radius original
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14, // Seu tamanho original
  },
});
