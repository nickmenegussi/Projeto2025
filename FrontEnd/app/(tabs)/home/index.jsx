import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel"; // Nova biblioteca de carrossel
import {
  Bell,
  CircleUserRoundIcon,
  MenuIcon,
  Pencil,
  PencilIcon,
} from "lucide-react-native";
import ButtonIcons from "../../../components/ButtonIcons";
import Trending from "../../../components/Navagation";
import EmptyContent from "../../../components/EmptyContent";
import api from "../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Agenda, Calendar } from "react-native-calendars";
import SideBar from "../../../components/Sidebar";
import ReviewCard from "../../../components/ReviewCard";
import FAQ from "../../../components/FAQ";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../../components/Button";
import LoadingScreen from "../../../components/AcitivityIndicator";
import { AuthContext } from "../../../context/auth";

const Home = () => {
  const objetivos = [
    {
      id: 1,
      title: "Objetivo #1",
      icon: require("../../../assets/images/adaptive-icon.png"),
      description: "Oferecemos palestras e estudos aberto ao público.",
      navigation: "/home/faq",
    },
    {
      id: 2,
      title: "Objetivo #2",
      description: "Realizamos campanhas solidárias e trabalhos voluntários.",
    },
  ];
  const [lectures, setLectures] = useState([]);
  const [VolunteerWork, setVolunteerWork] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [review, setReview] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mais recente", value: "newSet" },
    { label: "Mais antigo", value: "oldest" },
  ]);
  const [isLoading, setIsLoading] = useState(false)
  
  
  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);
  
      await ViewLectures();
      await ViewVolunteerWork();
      await ViewCalendar();
      await GetReview();
  
      setIsLoading(false)
    }
  
    carregarDados()
  }, [])

  async function ViewLectures() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token")
      const response = await api.get("/lectures/lectures", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      setLectures(response.data.data)
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log("Erro", error.response.data)
          Alert.alert("Erro", error.response.data.message)
          router.push("/sign-up")
        } else {
          console.log("Erro", error.response.data)
          Alert.alert("Erro", error.response.data.message)
        }
      } else {
        console.log("Erro", error)
      }
    }
  }
  async function ViewVolunteerWork() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token")
      const response = await api.get("/volunteerWork/work", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      setVolunteerWork(response.data.data)
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log("Erro", error.response.data)
          Alert.alert("Erro", error.response.data.message)
          router.push("/sign-up")
        } else {
          console.log("Erro", error.response.data)
          Alert.alert("Erro", error.response.data.message)
        }
      } else {
        console.log("Erro", error)
      }
    }
  }

  async function ViewCalendar() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token")
      const response = await api.get("/calendar/calendar", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      setCalendar(response.data.data)
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log("Erro", error.response.data)
          Alert.alert("Erro", error.response.data.message)
          router.push("/sign-up")
        } else {
          console.log("Erro", error.response.data)
          Alert.alert("Erro", error.response.data.message)
        }
      } else {
        console.log("Erro", error)
      }
    }
  }

  async function GetReview() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token")
      const user = await AsyncStorage.getItem("@Auth:user")
      const response = await api.get(
        `/review/reviewSociety?sortOrder=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:` Bearer ${token}`,
          },
        }
      )
      setReview(response.data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          Alert.alert("Erro", error.response.data.message);
          router.push("/sign-up");
        } else {
          Alert.alert("Erro", error.response.data.message);
          console.log("Erro", error.response.data.message);
        }
      } else {
        Alert.alert("Erro", error);
        console.log("Erro", error);
      }
    }
  }

  if (isLoading) {
    return (
      <LoadingScreen image={false} />
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <SideBar isOpen={IsSideBarOpen} setIsOpen={setIsSideBarOpen} />

        <FlatList
          data={[
            { type: "Palestras da Casa", content: lectures },
            {
              type: "Trabalho Voluntário",
              content: VolunteerWork,
            },
            { type: "Calendário de Eventos", content: calendar },
            { type: "Esclarecimentos sobre o Centro Espírita" },
            {
              type: "Quem Somos - Sociedade Espírita Gabriel Delanne",
            },
            {
              type: "Avaliações do Centro Espírita",
              content: review,
            },
          ]}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.header}>{item.type}</Text>
              {item.type === "Palestras da Casa" ? (
                lectures.length > 0 ? (
                  <Carousel
                    width={350}
                    height={170}
                    data={item.content}
                    renderItem={(item) => (
                      <View
                        style={styles.SmallcarouselItem}
                        key={item.item.idLecture}
                      >
                        <ImageBackground
                          source={require("../../../assets/images/Jesus-Cristo.png")} // URL da sua imagem
                          style={styles.BackgroundImage}
                          imageStyle={styles.imageStyle}
                        >
                          <TouchableOpacity
                            style={styles.overlay}
                            activeOpacity={0.5}
                            onPress={() =>
                              router.push({
                                pathname: "/home/lectures",
                                params: { data: JSON.stringify(lectures) },
                              })
                            }
                          >
                            <View style={styles.item}>
                              <Text style={styles.titlePost}>
                                {item.item.nameLecture}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    )}
                    scrollAnimationDuration={1000}
                    autoPlay={true}
                    loop={true}
                    autoPlayInterval={3000}
                    mode="parallax"
                    modeConfig={{
                      parallaxScrollingScale: 0.9,
                      parallaxScrollingOffset: 54,
                    }}
                  />
                ) : (
                  <View>
                    <ActivityIndicator size="large" color="0000ff" />
                  </View>
                )
              ) : item.type === "Trabalho Voluntário" ? (
                VolunteerWork.length > 0 ? (
                  <Carousel
                    width={350}
                    height={220}
                    data={item.content}
                    renderItem={(item) => (
                      <View
                        style={styles.SmallcarouselItem}
                        key={item.idVolunteerWork}
                      >
                        <ImageBackground
                          source={require("../../../assets/images/Jesus-Cristo.png")} // URL da sua imagem
                          style={styles.BackgroundImage}
                          imageStyle={styles.imageStyle}
                        >
                          <TouchableOpacity
                            style={styles.overlay}
                            activeOpacity={0.5}
                            onPress={() =>
                              router.push({
                                pathname: "/home/volunteerWork",
                                params: { data: JSON.stringify(item.item) },
                              })
                            }
                          >
                            <View style={styles.item}>
                              <Text style={styles.titlePostBigger}>
                                {item.item.nameVolunteerWork
                                  ? item.item.nameVolunteerWork
                                  : ""}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    )}
                    scrollAnimationDuration={1000}
                    autoPlay={true}
                    loop={true}
                    autoPlayInterval={3000}
                    mode="parallax"
                    modeConfig={{
                      parallaxScrollingScale: 0.9,
                      parallaxScrollingOffset: 54,
                    }}
                  />
                ) : (
                  <EmptyContent
                    title="Ops! Nada por aqui"
                    subtitle="Tente novamente mais tarde"
                  />
                )
              ) : item.type === "Calendário de Eventos" ? (
                calendar.length > 0 ? (
                  <>
                    <Calendar
                      accessibilityLanguage="PT-BR"
                      style={styles.calendar}
                      theme={{
                        backgroundColor: "#60A3D9",
                        calendarBackground: "#60A3D9",
                        textSectionTitleColor: "#fff",
                        selectedDayBackgroundColor: "#0A73D9",
                        selectedDayTextColor: "#ffffff",
                        todayTextColor: "#0A73D9",
                        dayTextColor: "#ffffff",
                        textDisabledColor: "#A0C1E8",
                        arrowColor: "#ffffff",
                        monthTextColor: "#ffffff",
                      }}
                      onDayPress={(day) => setSelectedDate(day.dateString)}
                    />

                    {selectedDate ? (
                      <View style={styles.eventsContainer}>
                        <Text style={styles.eventTitle}>Eventos do dia:</Text>
                        <View></View>
                        {item.content[0].status_permission === "admin" ||
                        item.content[0].status_permission === "SuperAdmin" ? (
                          <View style={styles.eventContent}>
                            <TouchableOpacity>
                              <PencilIcon color="black" size={20} />
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    ) : (
                      <View style={styles.eventsContainer}>
                        <Text style={styles.eventText}>
                          Nenhum evento para o dia
                        </Text>
                      </View>
                    )}
                  </>
                ) : (
                  <EmptyContent
                    title="Ops! Nada por aqui"
                    subtitle="Tente novamente mais tarde"
                  />
                )
              ) : item.type === "Avaliações do Centro Espírita" ? (
                <>
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
                        onChangeValue={(value) => {
                          setValue(value);
                          GetReview();
                        }}
                        placeholder="Ordenar por"
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
                          <View key={item.idReviewSociety}>
                            <ReviewCard
                              cardContainer={styles.cardContainer}
                              dataReview={item ? item : {}}
                              onEdit={() => {
                                Alert.alert(
                                  "Atualizar Avaliação",
                                  "Deseja atualizar a avaliação?",
                                  [
                                    { text: "Cancelar", style: "cancel" },
                                    {
                                      text: "Atualizar",
                                      onPress: () => {
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
                                      onPress: () =>
                                        handleDeleteReview(
                                          item.idReviewSociety,
                                          item.userId
                                        ),
                                    },
                                  ]
                                );
                              }}
                            />
                          </View>
                        ))}
                      </ScrollView>
                    ) : (
                      <Text>Nenhum review encontrado</Text>
                    )}
                    <Button title={"Ver mais"} handlePress={() => router.push('/home/reviewSociety')} buttonStyle={{backgroundColor: '#003B73', width: '100%'}}/>
                  </View>
                </>
              ) : item.type === "Esclarecimentos sobre o Centro Espírita" ? (
                <View style={styles.containerFaq}>
                  <FAQ />
                </View>
              ) : item.type ===
                "Quem Somos - Sociedade Espírita Gabriel Delanne" ? (
                <ScrollView style={styles.container}>
                  <Text style={styles.title}>
                    Saiba mais sobre Nossa Casa Espírita
                  </Text>
                  {objetivos.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.6}
                      style={styles.card}
                      onPress={() => {
                        item.navigation
                          ? router.push(item.navigation)
                          : Alert.alert(
                              "Erro ao navegar. Por favor, tente novamente.",
                              "Conteúdo ainda não definido."
                            );
                      }}
                    >
                      <Image source={item.icon} style={styles.icon} />
                      <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDescription}>
                          {item.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <EmptyContent
                  title="Ops! Nada por aqui"
                  subtitle="Tente novamente mais tarde"
                />
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View contentContainerStyle={styles.Container}>

              <View style={styles.containerIcons}>
                <ButtonIcons
                  color={"white"}
                  size={30}
                  handleChange={() => setIsSideBarOpen(!IsSideBarOpen)}
                  Icon={({ color, size }) => (
                    <MenuIcon color={color} size={size} />
                  )}
                />
                <View style={styles.IconsContent}>
                  <ButtonIcons
                    color={"white"}
                    size={30}
                    Icon={({ color, size }) => (
                      <Bell color={color} size={size} />
                    )}
                  />
                  <ButtonIcons
                    color={"white"}
                    size={30}
                    Icon={({ color, size }) => (
                      <CircleUserRoundIcon color={color} size={size} />
                    )}
                  />
                </View>
              </View>
              <Trending
                navagations={
                  [
                    {
                      name: "Palestras da Casa",
                      path: "/home/lectures",
                      data: lectures,
                    },

                    { name: "FAQ", path: "/home/faq" },
                  ] ?? []
                }
              />
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default React.memo(Home)

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "#003B73",
    padding: 10,
    borderRadius: 10,
  },
  safeAreaView: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "#003B73",
  },
  eventContent: {
    backgroundColor: "#fff",
    width: "12%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    top: 50,
    left: "88%",
    position: "relative",
  },
  Container: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
  },
  header: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    marginBottom: 25,
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
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  IconsContent: {
    flexDirection: "row",
    gap: 10,
  },
  carouselItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "start",
    height: 200,
  },
  SmallcarouselItem: {
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: "column",
    height: 150,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  titlePost: {
    fontSize: 16,
    color: "white",
    position: "relative",
    top: 110,
    left: 20,
    right: 10,
  },
  titlePostBigger: {
    fontSize: 16,
    color: "white",
    position: "relative",
    top: 160,
    left: 20,
    right: 10,
  },
  calendar: {
    height: 550,
    borderRadius: 10,
    marginBottom: 40,
  },
  containerFaq: {
    marginBottom: 40,
  },
  ContainerReviews: {
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    padding: 20,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 70,
    alignItems: "center",
    width: "100%",
  },
  eventsContainer: {
    justifyContent: "space-between",
    position: "absolute",
    bottom: 100,
    left: 10,
    right: 10,
  },
  BackgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "#60A3D9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 16,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  reviewsContainer: {
    height: 300,
    width: "100%",
    marginVertical: 10,
  },
});