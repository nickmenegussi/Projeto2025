import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";

const ReviewCard = ({ dataReview, isCurrentUser, onEdit, onDelete, ...props }) => {
  if (!dataReview) return null;
  const formatDate = (date) => {
    const dataRecebida = new Date(date);
    const dataAtual = new Date();
    const ms = dataAtual - dataRecebida;
    const min = Math.floor(ms / 60000);
    const hours = Math.floor(min / 60);
    const dias = Math.floor(hours / 24);

    if (min < 1) return "Publicado agora mesmo";
    if (min < 60) return `Publicado há ${min} minutos atrás`;
    if (hours < 24) return `Publicado há ${hours} horas atrás`;
    return `Publicado há ${dias} dias atrás`;
  };

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.feedback, , props.cardContainer]}>
        <Image
          style={styles.imageProfile}
          source={
            dataReview.image_profile
              ? { uri: dataReview.image_profile }
              : require("../assets/images/default-profile.jpg")
          }
        />
        <View style={styles.feedbackContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleFeedback}>{dataReview.nameUser}</Text>
            <Rating
              defaultRating={dataReview.ratingReview}
              size={14}
              showRating={false}
              selectedColor="#FFA500"
              isDisabled
            />
          </View>
          <Text style={styles.feedbackText}>{dataReview.descriptionReview}</Text>
          <Text style={styles.titleDate}>{formatDate(dataReview.create_at)}</Text>

          {isCurrentUser && (
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={onEdit}>
                <Text style={styles.textFeedbackUpdate}>Modificar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete}>
                <Text style={styles.textFeedbackDelete}>Deletar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
  },
  feedback: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
  },
  feedbackContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
    padding: 10,
    borderRadius: 10,
  },
  line: {
    width: "100%",
    borderWidth: 0.6,
    borderColor: "white",
    marginTop: 10,
  },
  titleFeedback: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  feedbackText: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  titleDate: {
    color: "white",
    fontSize: 12,
    opacity: 0.8,
  },
  textFeedbackDelete: {
    color: "#FF0000",
    fontSize: 14,
    fontWeight: "bold",
  },
  textFeedbackUpdate: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  }
});

export default ReviewCard;