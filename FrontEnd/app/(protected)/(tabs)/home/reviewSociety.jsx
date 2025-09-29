import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import { Rating } from "react-native-ratings";
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, Star, MessageCircle } from "lucide-react-native";
import CustomNavagation from "../../../../components/CustomNavagation";
import FormField from "../../../../components/FormField";
import { router } from "expo-router";
import Button from "../../../../components/Button";
import ReviewCard from "../../../../components/ReviewCard";
import DropDownPicker from "react-native-dropdown-picker";
import useReview from "../../../../hooks/useReview";
import Trending from "../../../../components/Navagation";
import CustomModal from "../../../../components/ModalCustom";

const { width } = Dimensions.get("window");

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
    { label: "⭐ Mais recente", value: "newSet" },
    { label: "🕐 Mais antigo", value: "oldest" },
  ]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetchReview();
  }, [sortOrder]);

  return (
    <View style={styles.container}>
      {/* Header com Imagem */}
      <ImageBackground
        source={require("../../../../assets/images/Jesus-Cristo.png")}
        style={styles.heroSection}
      >
        <View style={styles.heroOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back("/home/faq")}
          >
            <View style={styles.backButtonCircle}>
              <ArrowLeftIcon color="white" size={24} />
            </View>
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Avaliações</Text>
            <Text style={styles.heroSubtitle}>
              Sua opinião transforma nossa comunidade
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Navegação Customizada */}
      <View style={styles.navSection}>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          Navegação de Páginas
        </Text>
        <Trending
          navagations={[
            {
              type: "Navegação",
              name: "Objetivo 1",
              path: "/",
            },
            {
              name: "Objetivo 2",
              path: "",
            },
            { name: "Avaliar Casa", path: "" },
          ]}
          textTitlle={false}
        />
      </View>

      {open && (
        <CustomModal
          visible={open}
          item={review}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Adicionar Avaliação"
          confirmText="Publicar Avaliação"
          cancelText="Cancelar"
          customContent={
            <View style={styles.reviewFormCard}>
              <View style={styles.cardHeader}>
                <View style={styles.headerIcon}>
                  <Star size={20} color="#FFD700" />
                </View>
                <Text style={styles.cardTitle}>Deixe sua avaliação</Text>
              </View>

              <FormField
                title="Avaliação"
                placeholder="Compartilhe sua experiência conosco..."
                value={reviewUser.descriptionReview}
                handleChangeText={(text) =>
                  setReviewUser((e) => ({ ...e, descriptionReview: text }))
                }
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                othersStyles={styles.formField}
              />

              <View style={styles.ratingSection}>
                <Text style={styles.ratingLabel}>Sua avaliação:</Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={36}
                  readonly={false}
                  startingValue={reviewUser.ratingReview || 0}
                  showRating={false}
                  style={styles.rating}
                  ratingColor="#FFD700"
                  ratingBackgroundColor="#e0e0e0"
                  onFinishRating={(rating) =>
                    setReviewUser((prev) => ({
                      ...prev,
                      ratingReview: rating,
                    }))
                  }
                />
              </View>
            </View>
          }
        />
      )}

      <View style={styles.sectionHeader}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.headerLeft}>
            <MessageCircle size={20} color="#FFFFFF" />
            <Text style={styles.sectionTitle}>
              {review.length}
              {review.length === 1 ? " Avaliação" : " Avaliações"}
            </Text>
          </View>

          <View style={styles.filterContainer}>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={sortOrder}
              setValue={setSortOrder}
              items={items}
              setItems={setItems}
              onChangeValue={(value) => value && setSortOrder(value)}
              placeholder="Ordenar por"
              listMode="SCROLLVIEW"
              style={styles.picker}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.pickerText}
              arrowIconStyle={styles.arrowIcon}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Button
            title={"Adicionar um comentário"}
            handlePress={handleOpenModal}
            opacityNumber={0.9}
            containerStyles={styles.submitButton}
          />
        </View>
      </View>

      <FlatList
        data={review}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item, index }) => (
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsList}>
              <View
                key={item.idReviewSociety}
                style={[
                  styles.reviewItem,
                  index === 0 && styles.firstReviewItem,
                ]}
              >
                <ReviewCard
                  dataReview={item}
                  isCurrentUser={item.userId === reviewUser.userId}
                  onEdit={() => {
                    Alert.alert(
                      "Atualizar Avaliação",
                      "Deseja atualizar sua avaliação?",
                      [
                        {
                          text: "Cancelar",
                          style: "cancel",
                          onPress: () => console.log("Cancelado"),
                        },
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
                      "Excluir Avaliação",
                      "Tem certeza que deseja excluir esta avaliação?",
                      [
                        {
                          text: "Manter",
                          style: "cancel",
                        },
                        {
                          text: "Excluir",
                          style: "destructive",
                          onPress: () => {
                            // Implementar exclusão
                            console.log(
                              "Excluir avaliação:",
                              item.idReviewSociety
                            );
                          },
                        },
                      ]
                    );
                  }}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Star size={48} color="rgba(255, 255, 255, 0.3)" />
            <Text style={styles.emptyStateTitle}>Nenhuma avaliação ainda</Text>
            <Text style={styles.emptyStateText}>
              Seja o primeiro a compartilhar sua experiência!
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  heroSection: {
    height: 220,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 59, 115, 0.7)",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: "center",
  },
  heroTitle: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  navSection: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  reviewFormCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    margin: 20,
    marginTop: 10,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF9E6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#003B73",
  },
  formField: {
    marginTop: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003B73",
  },
  rating: {
    paddingVertical: 5,
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 12,
    height: 50,
  },
  reviewsSection: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  sectionHeader: {
    flexGrow: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  filterContainer: {
    width: 170,
    paddingHorizontal: 10,
  },
  picker: {
    height: 42,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    borderWidth: 0,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  pickerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#003B73",
  },
  arrowIcon: {
    tintColor: "#003B73",
  },
  dropdownContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 12,
    borderWidth: 0,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  reviewsList: {
    gap: 16,
  },
  reviewItem: {
    marginBottom: 8,
  },
  firstReviewItem: {
    marginTop: 5,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
