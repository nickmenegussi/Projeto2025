import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react-native";
import { router } from "expo-router";

export default function CardCustom({
  data,
  loan = false,
  reserves = false,
  aboutBookLoan = false,
  aboutBookReserves = false,
}) {
  const [books, setBooks] = useState(data || []);

  useEffect(() => {
    setBooks(data || []);
  }, [data]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer} // Adicione este estilo
    >
      {books.length > 0 ? (
        books.map((item) => (
          <View style={styles.card} key={item.idLibrary}>
            <ImageBackground
              source={{ uri: `http://192.168.1.15:3001/uploads/${item.image}` }}
              style={styles.image}
              resizeMode="cover"
              imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
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

              <Text style={styles.tags}>{item.tagsBook}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (aboutBookLoan === true) {
                    const encodedData = encodeURIComponent(
                      JSON.stringify([item])
                    );
                    router.push(`/library/aboutBook?data=${encodedData}`);
                  } else if (loan === true) {
                    const encodedData = encodeURIComponent(
                      JSON.stringify(books)
                    );
                    router.push(`/library/LoanCollection?data=${encodedData}`);
                  } else if (aboutBookReserves === true) {
                    const encodedData = encodeURIComponent(
                      JSON.stringify([item])
                    );
                    router.push(`/library/aboutBook?data=${encodedData}`);
                  } else if (reserves === true) {
                    const encodedData = encodeURIComponent(
                      JSON.stringify(books)
                    );
                    router.push(`/library/reserves?data=${encodedData}`);
                  }
                }}
              >
                <Text style={styles.buttonText}>Ver mais</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 0, // Espaço nas laterais
    paddingVertical: 0, // Espaço vertical se necessário
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
    width: 175,
    marginRight: 7, // Espaço entre os cards
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: "#facc15",
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  tags: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
    marginBottom: 12,
  },
});
