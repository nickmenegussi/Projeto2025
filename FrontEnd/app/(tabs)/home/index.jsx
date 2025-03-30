import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel"; // Nova biblioteca de carrossel
import { Bell, CircleUserRoundIcon, MenuIcon } from "lucide-react-native";
import ButtonIcons from "../../../components/ButtonIcons";
import Trending from "../../../components/Navagation";
import EmptyContent from "../../../components/EmptyContent";
import api from "../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Agenda, Calendar } from "react-native-calendars";
import FAQ from "../../../components/FAQ";
import SideBar from "../../../components/Sidebar";
import ReviewCard from "../../../components/ReviewCard";

const Home = () => {
  const [lectures, setLectures] = useState([]);
  const [VolunteerWork, setVolunteerWork] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    ViewLectures();
    ViewVolunteerWork();
    ViewCalendar();
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
      setCalendar(response.data.data);
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
              type: "Avaliações",
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
                      <TouchableOpacity>
                        <View style={styles.SmallcarouselItem}>
                          <Text style={styles.titlePost}>
                            {item.item.nameLecture}
                          </Text>
                        </View>
                      </TouchableOpacity>
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
              ) : item.type === "Trabalho Voluntário" ? (
                VolunteerWork.length > 0 ? (
                  <Carousel
                    width={350}
                    height={220}
                    data={item.content}
                    renderItem={(item) => (
                      <TouchableOpacity>
                        <View style={styles.carouselItem}>
                          <Text style={styles.titlePost}>
                            {item.item.nameVolunteerWork}
                          </Text>
                        </View>
                      </TouchableOpacity>
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
                        backgroundColor: "#4A90E2",
                        calendarBackground: "#4A90E2",
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
                    {/* {selectedDate && events[selectedDate] ? (
                        <View style={styles.eventsContainer}>
                        <Text style={styles.eventTitle}>Eventos do dia:</Text>
                        {events[selectedDate].map((event, index) => (
                          <View key={index} style={styles.eventItem}>
                          <Text style={styles.eventText}>{event.title}</Text>
                        </View>
                        ))}
                      </View>
                    ) : (
                      <View style={styles.eventsContainer}>
                        <Text style={styles.eventText}>Nenhum evento para o dia</Text>
                      </View>
                    )} */}
                  </>
                ) : (
                  <EmptyContent
                    title="Ops! Nada por aqui"
                    subtitle="Tente novamente mais tarde"
                  />
                )
              ) : item.type === "Avaliações" ? (
                <>
                  <View style={styles.ContainerReviews}>
                    <Text style={styles.header}>
                      Avaliações do Centro Espírita
                    </Text>
                    {/* <ReviewCard name={'Teste'} comment={'Lorem'} rating={4} /> */}
                    {/* <ReviewCard name={'Teste'} comment={'Lorem'} rating={4} />
                      <ReviewCard name={'Teste'} comment={'Lorem'} rating={4} />  */}
                  </View>
                </>
              ) : item.type === "Esclarecimentos sobre o Centro Espírita" ? (
                <View style={styles.containerFaq}>
                  <FAQ />
                </View>
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
                    {
                      name: "Trabalhos voluntários",
                      path: "/home/volunteerWork",
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

export default Home;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  safeAreaView: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "#003B73",
  },
  Container: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    marginBottom: 25,
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
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "start",
    height: 150,
  },
  titlePost: {
    fontSize: 16,
    color: "#003B73",
    marginTop: 50,
  },
  calendar: {
    height: 550,
    borderRadius: 10,
    marginBottom: 40,
  },
  containerFaq: {
    marginBottom: 10,
  },
  ContainerReviews: {
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    padding: 20,
  },
  eventsContainer: {
    position: "absolute",
    bottom: 100,
    left: 10,
    right: 10,
  },
});
