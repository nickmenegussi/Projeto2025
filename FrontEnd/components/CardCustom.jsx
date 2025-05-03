import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BookKey, Star } from "lucide-react-native";

export default function CardCustom({ data }) {
  const [books, setBooks] = useState(data);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {books.length > 0
        ? books.map((item) => (
            <View style={styles.card} key={item.idLibrary}>
              <ImageBackground
                source={ {uri: `http://192.168.1.10:3001/uploads/${item.image}`} }
                style={styles.image}
                alt='ImagemLivraria'
                resizeMode="cover"
              />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.nameBook}</Text>
                <Text style={styles.author}>
                    {item.authorBook}
                </Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#facc15" fill="#facc15" />
                  <Text style={styles.rating}>data</Text>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>algo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Ver mais</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        : (
                          <ActivityIndicator size="large" color="#0000ff" />
          
        )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginHorizontal: 8,
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: 'cover'
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  author: {
    color: "#6b7280",
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
    color: "#000",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
  },
});
