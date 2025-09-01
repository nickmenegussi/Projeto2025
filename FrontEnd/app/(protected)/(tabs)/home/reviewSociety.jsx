import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Rating } from "react-native-ratings";
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "lucide-react-native";
import CustomNavagation from "../../../../components/CustomNavagation";
import FormField from "../../../../components/FormField";
import { router } from "expo-router";
import Button from "../../../../components/Button";
import ReviewCard from "../../../../components/ReviewCard";
import DropDownPicker from "react-native-dropdown-picker";
import useReview from "../../../../hooks/useReview";

export default function ReviewSociety() {
  const {
    review,
    reviewUser,
    fetchReview,
    sortOrder,
    setSortOrder,
    setReviewUser,
    handleRegisterReview,
    modalVisible,
    setModalVisible,
  } = useReview();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Mais recente", value: "newSet" },
    { label: "Mais antigo", value: "oldest" },
  ]);

  useEffect(() => {
    fetchReview();
  }, [sortOrder]);

  return (
    <ScrollView style={styles.BackGroundSafeArea}>
      <ImageBackground
        imageStyle={styles.imageStyle}
        style={styles.BackGround}
        source={require("../../../../assets/images/Jesus-Cristo.png")}
      >
        <TouchableOpacity
          style={styles.ButtonIcon}
          onPress={() => router.back("/home/faq")}
        >
          <ArrowLeftIcon color="black" size={40} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.containerView}>
        <CustomNavagation
          trendingItems={[
            { name: "Objetivo #1" },
            { name: "Objetivo #2" },
            { name: "Avaliar Casa" },
          ]}
          otherStyles={true}
          normalPress={true}
          sendData={false}
        />

        <Text style={styles.textContainerView}>
          Seja o Primeiro a adicionar uma avaliação!
        </Text>

        <View style={styles.containerReview}>
          <FormField
            title="Avaliar o Centro Espírita"
            placeholder="Digite uma avaliação"
            value={reviewUser.descriptionReview}
            handleChangeText={(text) =>
              setReviewUser((e) => ({ ...e, descriptionReview: text }))
            }
            othersStyles={styles.buttonContainer}
            IconStyle={styles.ReviewButton}
          />
          <Rating
            type="custom"
            tintColor="#003B73"
            imageSize={30}
            readonly={false}
            startingValue={reviewUser.ratingReview || 0}
            count={5}
            defaultRating={0}
            showRating={false}
            style={{
              right: 100,
              position: "relative",
              marginTop: 15,
            }}
            onFinishRating={(rating) =>
              setReviewUser((prev) => ({ ...prev, ratingReview: rating }))
            }
          />

          <Button
            title={"Avaliar"}
            handlePress={handleRegisterReview}
            opacityNumber={0.6}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 70,
            marginTop: 20,
          }}
        >
          <Text style={styles.textContainerView}>
            {review.length} Comments
          </Text>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            value={sortOrder}
            setValue={setSortOrder}
            items={items}
            setItems={setItems}
            onChangeValue={(value) => {
              if (value) {
                setSortOrder(value);
              }
            }}
            placeholder="Ordenar por"
            listMode="SCROLLVIEW"
            style={styles.picker}
            dropDownContainerStyle={styles.itemDropDrown}
          />
        </View>

        {review.length > 0 ? (
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 5 }}
            style={styles.reviewsContainer}
          >
            {review.map((item) => (
              <View key={item.idReviewSociety}>
                <ReviewCard
                  dataReview={item}
                  isCurrentUser={item.userId === reviewUser.userId}
                  onEdit={() => {
                    Alert.alert(
                      "Atualizar Avaliação",
                      "Deseja atualizar a avaliação?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Atualizar",
                          onPress: () => {
                            setReviewUser((prev) => ({
                              ...prev,
                              descriptionReview: item.descriptionReview,
                              ratingReview: item.ratingReview,
                              currentReviewId: item.idReviewSociety,
                            }));
                            setModalVisible(true);
                          },
                        },
                      ]
                    );
                  }}
                  onDelete={() => {
                    Alert.alert(
                      "Deletar Avaliação",
                      "Deseja deletar a avaliação?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Deletar",
                          onPress: () => {
                            // Aqui você pode implementar a exclusão
                          },
                        },
                      ]
                    );
                  }}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.textContainerView}>Nenhum review encontrado</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  BackGroundSafeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  buttonContainer: {
    marginTop: 15,
    width: "100%",
  },
  containerView: {
    flex: 1,
    padding: 20,
    paddingBottom: 150,
    width: "100%",
    gap: 20,
  },
  ButtonIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  BackGround: {
    width: "100%",
    height: 300,
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 10,
  },
  textContainerView: {
    color: "white",
    fontSize: 18,
  },
  ReviewButton: {
    padding: 0,
    right: 10,
    position: "relative",
  },
  reviewsContainer: {
    height: 300,
    width: "100%",
    marginVertical: 10,
  },
  containerReview: {
    gap: 10,
  },
  picker: {
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#fff",
    width: "45%",
  },
  itemDropDrown: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 8,
    width: "45%",
  },
});
