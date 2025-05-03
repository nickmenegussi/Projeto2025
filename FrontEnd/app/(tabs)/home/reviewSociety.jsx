import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native"
import { AirbnbRating } from "react-native-ratings"
import React, { use, useEffect, useState } from "react"
import { ArrowLeftIcon } from "lucide-react-native"
import CustomNavagation from "../../../components/CustomNavagation"
import FormField from "../../../components/FormField"
import { router } from "expo-router"
import api from "../../../services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Button from "../../../components/Button"
import CustomModal from "../../../components/ModalCustom"
import ReviewCard from "../../../components/ReviewCard"
import DropDownPicker from "react-native-dropdown-picker"

export default function ReviewSociety() {
  const [reviewUser, setReviewUser] = useState({
    descriptionReview: "",
    ratingReview: 0,
    userId: null,
    currentReviewId: null,
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: "Mais recente", value: "newSet" },
    { label: "Mais antigo", value: "oldest" },
  ])

  const [review, setReview] = useState([])
  useEffect(() => {
    GetReview()
  }, [])

  async function GetReview() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token")
      const user = await AsyncStorage.getItem("@Auth:user")
      const userId = JSON.parse(user).idUser

      if (userId) {
        setReviewUser(() => ({ ...reviewUser, userId: userId }))
      }

      const response = await api.get(`/review/reviewSociety?sortOrder=${value}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      setReview(response.data.data)
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          Alert.alert("Erro", error.response.data.message)
          router.push("/sign-up")
        } else {
          Alert.alert("Erro", error.response.data.message)
          console.log("Erro", error.response.data.message)
        }
      } else {
        Alert.alert("Erro", error)
        console.log("Erro", error)
      }
    }
  }

  async function handleRegisterReview() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token")
      const response = await api.post(
        "/review/reviewSociety/create",
        {
          descriptionReview: reviewUser.descriptionReview,
          ratingReview: reviewUser.ratingReview,
          userId: reviewUser.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      Alert.alert("Sucesso", response.data.message)
      GetReview()
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          Alert.alert("Erro", error.response.data.message)
          router.push("/sign-up")
        } else {
          Alert.alert("Erro", error.response.data.message)
        }
      } else {
        Alert.alert("Erro", error)
        console.log("Erro", error)
      }
    }
  }

  async function handleDeleteReview(idReviewSociety, userId) {
    try {
      const token = await AsyncStorage.getItem("@Auth:token")
      const response = await api.delete(
        `/review/reviewSociety/${idReviewSociety}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: userId,
          },
        }
      )
      Alert.alert("Sucesso", response.data.message)
      GetReview()
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          Alert.alert("Erro", error.response.data.message)
          router.push("/sign-up")
        } else {
          Alert.alert("Erro", error.response.data.message)
        }
      } else {
        Alert.alert("Erro", error)
        console.log("Erro", error)
      }
    }
  }

  async function handleUpdateReview(idReviewSociety) {
    console.log(idReviewSociety)
    try {
      const token = await AsyncStorage.getItem("@Auth:token")
      const response = await api.put(
        `/review/reviewSociety/${idReviewSociety}/update`,
        {
          descriptionReview: reviewUser.descriptionReview,
          ratingReview: reviewUser.ratingReview,
          userId: reviewUser.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      Alert.alert("Sucesso", response.data.message)
      GetReview()
      setReviewUser({ ...reviewUser, descriptionReview: "", ratingReview: 0 })
      setModalVisible(false)
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          Alert.alert("Erro", error.response.data.message)
          router.push("/sign-up")
        } else {
          Alert.alert("Erro", error.response.data.message)
          console.log("Erro", error.response.data.message)
        }
      } else {
        Alert.alert("Erro", error)
        console.log("Erro", error)
      }
    }
  }

  return (
    <ScrollView style={styles.BackGroundSafeArea}>
      <ImageBackground
        imageStyle={styles.imageStyle}
        style={styles.BackGround}
        source={require("../../../assets/images/Jesus-Cristo.png")}
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
            { name: "Avaliar Casa",  },
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
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={30}
            selectedColor="#FFA500"
            showRating={false}
            starContainerStyle={{
              right: 90,
              position: "relative",
              marginTop: 15,
            }}
            onFinishRating={(rating) =>
              setReviewUser({ ...reviewUser, ratingReview: rating })
            }
          />
          <Button
            title={"Avaliar"}
            handlePress={handleRegisterReview}
            opacityNumber={0.6}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 70, marginTop: 20}}>
          <Text style={styles.textContainerView}>{review.length} Comments</Text>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            items={items}
            setItems={setItems}
            onChangeValue={(value) => {
              if(value){
                setValue(value)
                GetReview()
              }
            }}
            placeholder="Ordenar por"
            // listMode="ScrollView" para evitar erros de comportamentos do SCROLLVIEW
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
            {review.map((item, index) => (
              // transforma em um componente separado
              // <ReviewCard
              <View key={item.idReviewSociety}>
                <ReviewCard
                  dataReview={item ? item : {}}
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
                            setModalVisible(true)
                            setReviewUser({
                              ...reviewUser,
                              currentReviewId: item.idReviewSociety,
                              descriptionReview: item.descriptionReview,
                              ratingReview: item.ratingReview,
                            })
                          },
                        },
                      ]
                    )
                  }}
                  onDelete={() => {
                    Alert.alert(
                      "Deletar Avaliação",
                      "Deseja deletar a avaliação?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Deletar",
                          onPress: () =>
                            handleDeleteReview(
                              item.idReviewSociety,
                              item.userId
                            ),
                        },
                      ]
                    )
                  }}
                />
              </View>
            ))}
            {modalVisible && (
              <CustomModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Atualizar Avaliação"
                description="Atualize sua avaliação"
                confirmText="Atualizar"
                formField={true}
                descriptionReview={reviewUser.descriptionReview}
                onChangeDescription={(text) =>
                  setReviewUser({ ...reviewUser, descriptionReview: text })
                }
                ratingReview={true}
                ratingReviewValue={reviewUser.ratingReview}
                onChangeRating={(rating) =>
                  setReviewUser({ ...reviewUser, ratingReview: rating })
                }
                onConfirm={() => {
                  if (reviewUser.currentReviewId) {
                    handleUpdateReview(reviewUser.currentReviewId)
                  }
                }}
              />
            )}
          </ScrollView>
        ) : (
          <Text style={styles.textContainerView}>Nenhum review encontrado</Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  BackGroundSafeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  buttonContainer: {
    marginTop: 15,
    maxWidth: 350,
    minWidth: 350,
  },
  containerView: {
    flex: 1,
    padding: 20,
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
  textInputSmall: {
    width: "760%",
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
  feedback: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  feedbackText: {
    color: "white",
    fontSize: 15,
    maxWidth: 300,
  },
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    marginBottom: 70,
  },
  feedbackContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
    padding: 5,
    backgroundColor: "#003B73",
    borderRadius: 10,
  },
  titleFeedback: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  textFeedback: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  line: {
    width: "100%",
    borderWidth: 0.6,
    borderColor: "white",
    marginTop: 10,
  },
  titleDate: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  textFeedbackDelete: {
    color: "#FF0000",
    fontSize: 15,
    fontWeight: "bold",
  },
  textFeedbackUpdate: {
    color: "#4A90E2",
    fontSize: 15,
    fontWeight: "bold",
  },
  containerReview: {
    gap: 10,
  },
  picker: {
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#fff",
    width: "50%",
  },
  itemDropDrown: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 8,
    width: "50%", // Mesma largura do picker
  },
})
