import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const ReviewCard = ({ name, comment, rating }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <AirbnbRating defaultRating={rating} size={14} showRating={false} isDisabled />
        </View>
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#003B73", // Azul claro para o fundo
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 5,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 120,
    backgroundColor: "#60A3D9", // Azul escuro
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF", // Azul escuro
  },
  comment: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
