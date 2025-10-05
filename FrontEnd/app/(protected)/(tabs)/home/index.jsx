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
  Modal,
  Platform,
  Dimensions,
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
import ButtonIcons from "../../../../components/ButtonIcons";
import Trending from "../../../../components/Navagation";
import EmptyContent from "../../../../components/EmptyContent";
import api from "../../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Agenda, Calendar } from "react-native-calendars";
import SideBar from "../../../../components/Sidebar";
import ReviewCard from "../../../../components/ReviewCard";
import FAQ from "../../../../components/FAQ";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../../../components/Button";
import LoadingScreen from "../../../../components/AcitivityIndicator";
import Header from "../../../../components/Header";
const { width } = Dimensions.get("window");

const Home = () => {
  const objetivos = [
    {
      id: 1,
      title: "Objetivo #1",
      icon: require("../../../../assets/images/adaptive-icon.png"),
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
  const [calendar, setCalendar] = useState([
    {
      id: 1,
      date: "2025-09-15",
      time: "19:30",
      name: "Palestra: Os Ensinamentos de Jesus",
      description: "Palestra sobre os princípios cristãos na doutrina espírita",
      status_permission: "user",
    },
    {
      id: 2,
      date: "2025-09-20",
      time: "15:00",
      name: "Campanha do Agasalho",
      description: "Arrecadação de roupas para famílias carentes",
      status_permission: "user",
    },
    {
      id: 3,
      date: "2025-09-25",
      time: "20:00",
      name: "Estudo Sistematizado da Doutrina Espírita",
      description: "Grupo de estudo semanal",
      status_permission: "admin",
    },
    {
      id: 4,
      date: "2025-09-05",
      time: "09:00",
      name: "Trabalho Voluntário - Creche",
      description: "Visita e atividades com crianças",
      status_permission: "user",
    },
    {
      id: 5,
      date: "2025-09-10",
      time: "19:00",
      name: "Reunião de Passes",
      description: "Aplicação de passes magnéticos",
      status_permission: "SuperAdmin",
    },
    {
      id: 6,
      date: "2025-09-15",
      time: "14:00",
      name: "Bazar Beneficente",
      description: "Venda de produtos com renda revertida para obras sociais",
      status_permission: "user",
    },
    {
      id: 7,
      date: "2025-09-15", // Mesma data do primeiro evento
      time: "16:00",
      name: "Reunião de Juventude",
      description: "Encontro dos jovens espíritas",
      status_permission: "user",
    },
  ]);
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [review, setReview] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mais recente", value: "newSet" },
    { label: "Mais antigo", value: "oldest" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    const eventsForDate = calendar.filter(
      (event) => event.date === day.dateString
    );
    setSelectedDateEvents(eventsForDate);
    setModalVisible(true);
  };

  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);

      await ViewLectures();
      await ViewVolunteerWork();
      // await ViewCalendar();
      await GetReview();

      setIsLoading(false);
    };

    carregarDados();
  }, []);

  async function ViewLectures() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.get("/lectures/lectures", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setLectures(response.data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
          router.push("/sign-up");
        } else {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
        }
      } else {
        console.log("Erro", error);
      }
    }
  }
  async function ViewVolunteerWork() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.get("/volunteerWork/work", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setVolunteerWork(response.data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
          router.push("/sign-up");
        } else {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
        }
      } else {
        console.log("Erro", error);
      }
    }
  }

  async function ViewCalendar() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.get("/calendar/calendar", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // setCalendar(response.data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
          router.push("/sign-up");
        } else {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
        }
      } else {
        console.log("Erro", error);
      }
    }
  }

  async function GetReview() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const user = await AsyncStorage.getItem("@Auth:user");
      const response = await api.get(
        `/review/reviewSociety?sortOrder=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
        }
      );
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#003B73",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingScreen image={false} />
      </View>
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
                    width={340}
                    height={200}
                    data={item.content}
                    renderItem={({ item: gi }) => (
                      <View style={styles.SmallcarouselItem} key={gi.idLecture}>
                        <ImageBackground
                          source={
                            gi.ImageUrl
                              ? { uri: gi.ImageUrl }
                              : require("../../../../assets/images/Jesus-Cristo.png")
                          }
                          style={styles.BackgroundImage}
                          imageStyle={styles.imageStyle}
                        >
                          <LinearGradient
                            colors={["transparent", "rgba(0,0,0,0.8)"]}
                            style={styles.gradientOverlay}
                          >
                            <TouchableOpacity
                              style={styles.overlay}
                              activeOpacity={0.7}
                              onPress={() =>
                                router.push({
                                  pathname: "/home/lectures",
                                  params: { data: JSON.stringify(lectures) },
                                })
                              }
                            >
                              <View style={styles.item}>
                                <Text
                                  style={styles.titlePost}
                                  numberOfLines={2}
                                >
                                  {gi.nameLecture}
                                </Text>
                                <View style={styles.detailsContainer}>
                                  <Text style={styles.SubtitlePost}>
                                    {gi.timeLecture}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </LinearGradient>
                        </ImageBackground>
                      </View>
                    )}
                    scrollAnimationDuration={1000}
                    loop
                    autoPlay
                    autoPlayInterval={4000}
                    windowSize={3}
                    panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
                    mode="parallax"
                    modeConfig={{
                      parallaxScrollingScale: 0.9,
                      parallaxScrollingOffset: 50,
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
                    width={340}
                    height={200}
                    data={item.content}
                    renderItem={({ item: gi }) => (
                      <View
                        style={styles.SmallcarouselItem}
                        key={gi.idVolunteerWork}
                      >
                        <ImageBackground
                          source={
                            gi.ImageUrl
                              ? { uri: gi.ImageUrl }
                              : require("../../../../assets/images/Jesus-Cristo.png")
                          }
                          style={styles.BackgroundImage}
                          imageStyle={styles.imageStyle}
                        >
                          <LinearGradient
                            colors={["transparent", "rgba(0,0,0,0.8)"]}
                            style={styles.gradientOverlay}
                          >
                            <TouchableOpacity
                              style={styles.overlay}
                              activeOpacity={0.7}
                              onPress={() =>
                                router.push({
                                  pathname: "/home/volunteerWork",
                                  params: { data: JSON.stringify(item) },
                                })
                              }
                            >
                              <View style={styles.item}>
                                <Text
                                  style={styles.titlePost}
                                  numberOfLines={2}
                                >
                                  {gi.nameVolunteerWork}
                                </Text>
                                <View style={styles.detailsContainer}>
                                  <Text style={styles.SubtitlePost}>
                                    {gi.address}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </LinearGradient>
                        </ImageBackground>
                      </View>
                    )}
                    scrollAnimationDuration={1000}
                    loop
                    autoPlay
                    autoPlayInterval={4000}
                    windowSize={3}
                    panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
                    mode="parallax"
                    modeConfig={{
                      parallaxScrollingScale: 0.9,
                      parallaxScrollingOffset: 50,
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
                  <View style={styles.calendarSection}>
                    <Calendar
                      accessibilityLanguage="PT-BR"
                      style={styles.calendar}
                      theme={{
                        backgroundColor: "#ffffff",
                        calendarBackground: "#ffffff",
                        textSectionTitleColor: "#003B73",
                        selectedDayBackgroundColor: "#0A73D9",
                        selectedDayTextColor: "#ffffff",
                        todayTextColor: "#0A73D9",
                        dayTextColor: "#2d4150",
                        textDisabledColor: "#A0C1E8",
                        arrowColor: "#0A73D9",
                        monthTextColor: "#003B73",
                        indicatorColor: "#0A73D9",
                        textDayFontWeight: "300",
                        textMonthFontWeight: "bold",
                        textDayHeaderFontWeight: "500",
                        textDayFontSize: 14,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 14,
                      }}
                      onDayPress={handleDateSelect}
                      markedDates={{
                        ...calendar.reduce((acc, event) => {
                          acc[event.date] = {
                            marked: true,
                            dotColor: "#FF6B6B",
                            activeOpacity: 0.7,
                          };
                          return acc;
                        }, {}),
                        [selectedDate]: {
                          selected: true,
                          selectedColor: "#0A73D9",
                          selectedTextColor: "#ffffff",
                        },
                      }}
                    />

                    <Text style={styles.selectDateHint}>
                      Toque em uma data para ver os eventos
                    </Text>

                    {/* Modal para mostrar eventos */}
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                              Eventos do dia {selectedDate}
                            </Text>
                            <TouchableOpacity
                              style={styles.closeButton}
                              onPress={() => setModalVisible(false)}
                            >
                              <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                          </View>

                          <ScrollView style={styles.modalScrollView}>
                            {selectedDateEvents.length > 0 ? (
                              selectedDateEvents.map((event, index) => (
                                <View key={index} style={styles.eventItem}>
                                  <View style={styles.eventTimeContainer}>
                                    <Text style={styles.eventTime}>
                                      {event.time || "Horário não especificado"}
                                    </Text>
                                  </View>
                                  <View style={styles.eventDetails}>
                                    <Text style={styles.eventName}>
                                      {event.name}
                                    </Text>
                                    <Text style={styles.eventDescription}>
                                      {event.description || "Sem descrição"}
                                    </Text>
                                  </View>
                                </View>
                              ))
                            ) : (
                              <View style={styles.noEventsContainer}>
                                <Text style={styles.noEventsText}>
                                  Nenhum evento para esta data
                                </Text>
                              </View>
                            )}
                          </ScrollView>

                          {(calendar[0]?.status_permission === "admin" ||
                            calendar[0]?.status_permission ===
                              "SuperAdmin") && (
                            <TouchableOpacity style={styles.addEventButton}>
                              <PencilIcon color="white" size={20} />
                              <Text style={styles.addEventText}>
                                Adicionar Evento
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </Modal>
                  </View>
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
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 20,
                          fontWeight: "700",
                        }}
                      >
                        Avaliações
                      </Text>

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
                    <Button
                      title={"Ver mais"}
                      handlePress={() => router.push("/home/reviewSociety")}
                      buttonStyle={{
                        backgroundColor: "#003B73",
                        width: "100%",
                      }}
                    />
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
            <View style={styles.Container}>
              <Header
                title="Home"
                onMenuPress={() => setIsSideBarOpen(!IsSideBarOpen)}
              />
              <Trending
                navagations={[
                  {
                    name: "Palestras da Casa",
                    path: "/home/lectures",
                    data: lectures,
                  },
                  { name: "FAQ", path: "/home/faq" },
                ]}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </SafeAreaView>
    </>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({
  // ===== ESTILOS GERAIS E DE LAYOUT =====
  linearGradient: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  safeAreaView: {
    flex: 1,
    padding: Platform.OS === "web" ? 24 : 16,
    paddingVertical: Platform.OS === "web" ? 20 : 0,
    backgroundColor: "#003B73",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#003B73",
  },

  // ===== LAYOUT ESPECÍFICO PARA WEB =====
  webContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#003B73",
  },
  webContent: {
    flex: 1,
    padding: Platform.OS === "web" ? 24 : 16,
  },
  webMainLayout: {
    flex: 1,
    flexDirection: Platform.OS === "web" ? "row" : "column",
    marginTop: 20,
    gap: Platform.OS === "web" ? 24 : 0,
  },
  webLeftColumn: {
    flex: 1,
    marginRight: Platform.OS === "web" ? 16 : 0,
    maxWidth: Platform.OS === "web" ? "60%" : "100%",
  },
  webRightColumn: {
    flex: 1,
    maxWidth: Platform.OS === "web" ? "40%" : "100%",
  },
  webSection: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      },
      default: {
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },
  webSectionTitle: {
    fontSize: Platform.OS === "web" ? 20 : 17,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },

  // ===== CABEÇALHOS E TÍTULOS =====
  Container: {
    backgroundColor: "#003B73",
    marginBottom: Platform.OS === "web" ? 24 : 16,
  },
  header: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#4A90E2",
    color: "#fff",
    marginBottom: 25,
  },
  headerTitle: {
    color: "white",
    fontSize: Platform.OS === "web" ? 28 : 24,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: Platform.OS === "web" ? 20 : 16,
  },
  title: {
    fontSize: Platform.OS === "web" ? 22 : 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },

  // ===== CARTÕES E CONTAINERS =====
  cardContainer: {
    backgroundColor:
      Platform.OS === "web" ? "rgba(255, 255, 255, 0.08)" : "#003B73",
    padding: Platform.OS === "web" ? 16 : 10,
    borderRadius: 12,
    marginBottom: Platform.OS === "web" ? 20 : 16,
    ...Platform.select({
      web: {
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
    }),
  },
  containerFaq: {
    marginBottom: Platform.OS === "web" ? 32 : 40,
  },
  ContainerReviews: {
    position: "relative",
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    padding:  20,
    ...Platform.select({
      web: {
        boxShadow: "0 6px 16px rgba(0, 59, 115, 0.3)",
      },
    }),
  },

  // ===== AVATAR E IMAGENS =====
  avatarImage: {
    width: Platform.OS === "web" ? 50 : 42,
    height: Platform.OS === "web" ? 50 : 42,
    borderRadius: Platform.OS === "web" ? 25 : 21,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
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

  // ===== COMPONENTES DE FORMULÁRIO =====
  picker: {
    height: Platform.OS === "web" ? 48 : 55,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0,
    width: Platform.OS === "web" ? "40%" : "50%",
    ...Platform.select({
      web: {
        padding: 12,
        fontSize: 16,
      },
    }),
  },
  itemDropDrown: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 8,
    width: Platform.OS === "web" ? "40%" : "50%",
  },

  // ===== LAYOUT E DISPOSIÇÃO DE ELEMENTOS =====
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Platform.OS === "web" ? 20 : 16,
  },
  IconsContent: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  reviewsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
    flex: 1,
    marginBottom: Platform.OS === "web" ? 20 : 16,
  },

  // ===== ITENS DO CAROUSEL =====
  carouselItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    height: Platform.OS === "web" ? 220 : 200,
  },
  SmallcarouselItem: {
    borderRadius: 10,
        alignItems: "center",

    flex: 1,
    marginRight: 10,
    flexDirection: "column",
    height: Platform.OS === "web" ? 170 : 150,
  },

  // ===== OVERLAY E TÍTULOS DE POSTS =====
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
    top: 100,
    left: 20,
    right: 10,
  },

  // ===== CARTÕES DE CONTEÚDO =====
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: Platform.OS === "web" ? 20 : 16,
    marginBottom: Platform.OS === "web" ? 20 : 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    width: Platform.OS === "web" ? 56 : 48,
    height: Platform.OS === "web" ? 56 : 48,
    marginRight: Platform.OS === "web" ? 20 : 16,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: Platform.OS === "web" ? 18 : 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: Platform.OS === "web" ? 15 : 14,
    color: "#555",
    lineHeight: Platform.OS === "web" ? 1.5 : 20,
  },

  // ===== CONTAINER DE REVIEWS =====
  reviewsContainer: {
    height:  300,
    flex: 1,
  },

  // ===== BOTÕES =====
  editButton: {
    backgroundColor: "#0A73D9",
    width: Platform.OS === "web" ? 44 : 40,
    height: Platform.OS === "web" ? 44 : 40,
    borderRadius: Platform.OS === "web" ? 22 : 20,
    justifyContent: "center",
    alignItems: "center",
  },

  // ===== CALENDÁRIO =====
  calendarSection: {
    marginBottom: Platform.OS === "web" ? 32 : 30,
  },
  calendar: {
    height: Platform.OS === "web" ? 400 : 380,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectDateHint: {
    textAlign: "center",
    color: "#fff",
    fontStyle: "italic",
    marginTop: 10,
    fontSize: Platform.OS === "web" ? 15 : 14,
  },

  // ===== MODAL =====
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: Platform.OS === "web" ? 16 : 20,
    padding: Platform.OS === "web" ? 24 : 20,
    width: Platform.OS === "web" ? "50%" : "90%",
    maxWidth: Platform.OS === "web" ? 600 : "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: Platform.OS === "web" ? 22 : 20,
    fontWeight: "bold",
    color: "#003B73",
    flex: 1,
  },
  closeButton: {
    width: Platform.OS === "web" ? 34 : 30,
    height: Platform.OS === "web" ? 34 : 30,
    borderRadius: Platform.OS === "web" ? 17 : 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: Platform.OS === "web" ? 20 : 18,
    fontWeight: "bold",
    color: "#003B73",
  },
  modalScrollView: {
    maxHeight: 400,
    marginBottom: 10,
  },

  // ===== EVENTOS (DENTRO DO MODAL) =====
  eventItem: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#0A73D9",
  },
  eventTimeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    minWidth: Platform.OS === "web" ? 80 : 70,
    backgroundColor: "#0A73D9",
    borderRadius: 8,
    padding: 5,
  },
  eventTime: {
    fontSize: Platform.OS === "web" ? 15 : 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: Platform.OS === "web" ? 17 : 16,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: Platform.OS === "web" ? 15 : 14,
    color: "#666",
    lineHeight: Platform.OS === "web" ? 1.5 : 20,
  },

  // ===== ESTADOS VAZIOS E MENSAGENS =====
  noEventsContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noEventsText: {
    fontSize: Platform.OS === "web" ? 17 : 16,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
  },

  // ===== BOTÃO DE ADICIONAR EVENTO =====
  addEventButton: {
    flexDirection: "row",
    backgroundColor: "#0A73D9",
    borderRadius: 10,
    padding: Platform.OS === "web" ? 14 : 12,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: Platform.OS === "web" ? 15 : 14,
  },
  containerTextGroup: {
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  TextStudyGroup: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#4A90E2",
  },
  IconsContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  SmallcarouselItem: {
    borderRadius: 16,
    marginRight: 10,
    flex: 1,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  BackgroundImage: {
    flex: 1,
    width: "100%",
    height: 200,
  },
  Container: {
    paddingVertical: 10.5,
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradientOverlay: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: "flex-end",
  },
  item: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titlePost: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  SubtitlePost: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.95)",
    marginLeft: 6,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  timeText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 6,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  containerTextGroup: {
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  TextStudyGroup: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#4A90E2",
  },
  IconsContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  SmallcarouselItem: {
    borderRadius: 16,
    marginRight: 10,
    flex: 1,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  BackgroundImage: {
    flex: 1,
    width: "100%",
    height: 200,
  },
  Container: {
    paddingVertical: 10.5,
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradientOverlay: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: "flex-end",
  },
  item: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titlePost: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  SubtitlePost: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.95)",
    marginLeft: 6,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  timeText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 6,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
