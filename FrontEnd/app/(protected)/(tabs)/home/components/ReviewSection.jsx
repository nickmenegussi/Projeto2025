import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../../../../components/Button";
import ReviewCard from "../../../../../components/ReviewCard";
import styles from "../styles/homeStyles";
import { router } from "expo-router";

const ReviewsSection = ({ review, GetReview }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mais recente", value: "newSet" },
    { label: "Mais antigo", value: "oldest" },
  ]);

  return (
    <View style={styles.ContainerReviews}>
      <View style={styles.reviewsHeader}>
        <Text style={styles.header}>Avaliações</Text>
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          items={items}
          setItems={setItems}
          onChangeValue={(v) => { setValue(v); GetReview(); }}
          placeholder="Ordenar por"
          style={styles.picker}
          dropDownContainerStyle={styles.itemDropDrown}
        />
      </View>

      <ScrollView nestedScrollEnabled style={styles.reviewsContainer}>
        {review.map((item) => (
          <ReviewCard key={item.idReviewSociety} dataReview={item} />
        ))}
      </ScrollView>

      <Button
        title="Ver mais"
        handlePress={() => router.push("/home/reviewSociety")}
        buttonStyle={{ backgroundColor: "#003B73", width: "100%" }}
      />
    </View>
  );
};

export default ReviewsSection;
