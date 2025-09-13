import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from 'react-native-webview';

import styles from "./styles/homeStyles";
import { AuthContext } from "../../../../context/auth";

import SideBar from "../../../../components/Sidebar";
import Trending from "../../../../components/Navagation";
import Header from "../../../../components/Header";

import LectureCarousel from "./components/LectureCaroseul";
import VolunteerWorkCarousel from "./components/VolunteerWorkCarousel";
import CalendarSection from "./components/EventCalendar";
import ReviewsSection from "./components/ReviewSection";
import FAQSection from "./components/FaqSection";
import AboutUsSection from "./components/AboutUsSection";

import api from "../../../../services/api";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isLargeScreen = width > 768;

  const [lectures, setLectures] = useState([]);
  const [volunteerWork, setVolunteerWork] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

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

  // Função para buscar dados da API
  const carregarDados = async () => {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      
      // Carrega todos os dados em paralelo
      const [lecturesRes, volunteerRes, reviewRes] = await Promise.all([
        api.get("/lectures/lectures", { headers: { Authorization: "Bearer " + token } }),
        api.get("/volunteerWork/work", { headers: { Authorization: "Bearer " + token } }),
        api.get("/review/reviewSociety", { headers: { Authorization: "Bearer " + token } })
      ]);

      setLectures(lecturesRes.data.data || []);
      setVolunteerWork(volunteerRes.data.data || []);
      setReview(reviewRes.data.data || []);

    } catch (error) {
      console.log("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Layout para web com duas colunas
  if (isWeb && isLargeScreen) {
    return (
      // colocar scrollview
      <View style={styles.webContainer}>
        <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
        
        <View style={styles.webContent}>
          <Header title="Home" onMenuPress={() => setIsSideBarOpen(!isSideBarOpen)} />
          
          <View style={styles.webMainLayout}>
            {/* Coluna da esquerda */}
            <View style={styles.webLeftColumn}>
              <View style={styles.webSection}>
                <Text style={styles.webSectionTitle}>Palestras da Casa</Text>
                <LectureCarousel lectures={lectures} />
              </View>
              
              <View style={styles.webSection}>
                <Text style={styles.webSectionTitle}>Trabalho Voluntário</Text>
                <VolunteerWorkCarousel VolunteerWork={volunteerWork} />
              </View>
              
              <View style={styles.webSection}>
                <Text style={styles.webSectionTitle}>Avaliações</Text>
                <ReviewsSection review={review} GetReview={carregarDados} />
              </View>
            </View>
            
            {/* Coluna da direita */}
            <View style={styles.webRightColumn}>
              <View style={styles.webSection}>
                <Text style={styles.webSectionTitle}>Calendário de Eventos</Text>
                <CalendarSection calendar={calendar} />
              </View>
              
              <View style={styles.webSection}>
                <Text style={styles.webSectionTitle}>FAQ</Text>
                <FAQSection />
              </View>
              
              <View style={styles.webSection}>
                <Text style={styles.webSectionTitle}>Quem Somos</Text>
                <AboutUsSection objetivos={objetivos} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Layout padrão para mobile
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          { type: "Palestras da Casa", component: LectureCarousel, props: { lectures } },
          { type: "Trabalho Voluntário", component: VolunteerWorkCarousel, props: { VolunteerWork: volunteerWork } },
          { type: "Calendário de Eventos", component: CalendarSection, props: { calendar } },
          { type: "FAQ", component: FAQSection, props: {} },
          { type: "Quem Somos", component: AboutUsSection, props: { objetivos } },
          { type: "Avaliações", component: ReviewsSection, props: { review, GetReview: carregarDados } },
        ]}
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => {
          const SectionComponent = item.component;
          return (
            <View style={{ marginVertical: 0 }}>
              <Text style={styles.header}>{item.type}</Text>
              <SectionComponent {...item.props} />
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View style={styles.Container}>
            <Header title="Home" onMenuPress={() => setIsSideBarOpen(!isSideBarOpen)} />
            <Trending
              navagations={[
                { name: "Palestras da Casa", path: "/home/lectures", data: lectures },
                { name: "FAQ", path: "/home/faq" },
              ]}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default React.memo(Home);