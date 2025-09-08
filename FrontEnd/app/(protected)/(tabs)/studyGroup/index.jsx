import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

import styles from "./styles/StudyGroupStyle";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ButtonIcons from "../../../../components/ButtonIcons";
import {
  Bell,
  BookOpen,
  Calendar,
  Clock,
  MenuIcon,
  ChevronRight,
  Star,
  Plus,
} from "lucide-react-native";
import { router } from "expo-router";
import Trending from "../../../../components/Navagation";
import api from "../../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../../../context/auth";
import Header from "../../../../components/Header";

const { width } = Dimensions.get("window");

const HomeStudyGroup = () => {
  const { user } = useContext(AuthContext);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([
    { id: 1, type: "Grupo de Estudo CIEDE", key: "CIEDE", content: [] },
    { id: 2, type: "Grupo de Estudo ESDE", key: "ESDE", content: [] },
    {
      id: 3,
      type: "Grupo de Estudo Mediúnicos",
      key: "MEDIUNICO",
      content: [],
    },
    { id: 4, type: "Outro Grupo de Estudo", key: "OUTROS", content: [] },
  ]);

  async function ViewGroupOfstudy() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.get("/groupOfStudy/groupOfStudy", {
        headers: { Authorization: "Bearer " + token },
      });

      const list = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      const ciede = list.filter(
        (g) => (g.TypeGroup || "").trim().toUpperCase() === "CIEDE"
      );
      const esde = list.filter(
        (g) => (g.TypeGroup || "").trim().toUpperCase() === "ESDE"
      );
      const medi = list.filter(
        (g) => (g.TypeGroup || "").trim().toUpperCase() === "MEDIUNICO"
      );
      const outros = list.filter(
        (g) =>
          !["CIEDE", "ESDE", "MEDIUNICO"].includes(
            (g.TypeGroup || "").trim().toUpperCase()
          )
      );

      setGroups((prev) =>
        prev.map((block) => {
          if (block.key === "CIEDE") return { ...block, content: ciede };
          if (block.key === "ESDE") return { ...block, content: esde };
          if (block.key === "MEDIUNICO") return { ...block, content: medi };
          if (block.key === "OUTROS") return { ...block, content: outros };
          return block;
        })
      );
    } catch (error) {
      if (error.response?.data?.loginRequired === true) {
        Alert.alert(
          "Erro",
          error.response.data.message || "Faça login novamente."
        );
        router.push("/sign-up");
      } else {
        console.log("Erro grupos:", error.response?.data || error);
        Alert.alert("Erro", "Não foi possível carregar os grupos.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    ViewGroupOfstudy();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    ViewGroupOfstudy();
  }, []);

  const EmptyState = ({ message }) => (
    <View style={styles.emptyContainer}>
      <BookOpen size={40} color="#A0A0A0" />
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );

  const headerSection = () => {
  return (
    <View style={styles.Container}>
      <Header title="Grupos de Estudo" onMenuPress={() => setIsSideBarOpen(!isSideBarOpen)} />
      <Trending
        navagations={[
          { name: "Palestras da Casa", path: "/home/lectures", data: [] },
          { name: "FAQ", path: "/home/faq" },
        ]}
      />
    </View>
  );
};

  const goToGroupList = useCallback(
    (payload) => router.push(`/studyGroup/group/${payload[0].TypeGroup}`),
    []
  );

  const renderItem = useCallback(
    ({ item: section, index }) => {
      return (
        <Animated.View
          entering={FadeInDown.duration(600).delay(index * 100)}
          style={styles.containerTextGroup}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.TextStudyGroup}>{section.type}</Text>
            {section.content && section.content.length > 0 && (
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => goToGroupList(section.content)}
              >
                <Text style={styles.seeAllText}>Ver todos</Text>
                <ChevronRight size={16} color="#4A90E2" />
              </TouchableOpacity>
            )}
          </View>

          {section.content && section.content.length > 0 ? (
            <Carousel
              width={width - 40}
              height={200}
              data={section.content}
              renderItem={({ item: gi }) => (
                <View style={styles.SmallcarouselItem} key={gi.IdGroupOfStudy}>
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
                        onPress={() => goToGroupList(section.content)}
                      >
                        <View style={styles.item}>
                          <Text style={styles.titlePost} numberOfLines={1}>
                            {gi.NameStudy}
                          </Text>
                          <View style={styles.detailsContainer}>
                            <Calendar
                              size={14}
                              color="rgba(255, 255, 255, 0.9)"
                            />
                            <Text style={styles.SubtitlePost}>
                              {gi.TypeGroup}{" "}
                              {gi.DayOfWeek ? `• ${gi.DayOfWeek}` : ""}
                            </Text>
                          </View>
                          {gi.Time && (
                            <View style={styles.detailsContainer}>
                              <Clock
                                size={14}
                                color="rgba(255, 255, 255, 0.9)"
                              />
                              <Text style={styles.timeText}>{gi.Time}</Text>
                            </View>
                          )}
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
            <EmptyState message="Novos grupos em breve. Fique atento!" />
          )}
        </Animated.View>
      );
    },
    [goToGroupList]
  );

  const footerSection = () => {
    return (
      <View style={styles.facilitatorsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Facilitadores</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push("/studyGroup/facilitadores")}
          >
            <Text style={styles.seeAllText}>Ver todos</Text>
            <ChevronRight size={16} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.facilitatorsList}
          contentContainerStyle={styles.facilitatorsContent}
        >
          {/* Facilitador 1 */}
          <TouchableOpacity
            style={styles.facilitatorCard}
            onPress={() =>
              router.push(
                `/studyGroup/facilitador/${facilitator.idFacilitadores}`
              )
            }
          >
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=11" }}
                style={styles.facilitatorAvatar}
              />
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.facilitatorName} numberOfLines={1}>
              Gabriel Silva
            </Text>
            <Text style={styles.facilitatorRole} numberOfLines={1}>
              CIEDE
            </Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </TouchableOpacity>

          {/* Facilitador 2 */}
          <TouchableOpacity style={styles.facilitatorCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                style={styles.facilitatorAvatar}
              />
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.facilitatorName} numberOfLines={1}>
              Mariana Costa
            </Text>
            <Text style={styles.facilitatorRole} numberOfLines={1}>
              ESDE
            </Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </TouchableOpacity>

          {/* Facilitador 3 */}
          <TouchableOpacity style={styles.facilitatorCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=13" }}
                style={styles.facilitatorAvatar}
              />
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.facilitatorName} numberOfLines={1}>
              Ricardo Almeida
            </Text>
            <Text style={styles.facilitatorRole} numberOfLines={1}>
              Mediúnico
            </Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>4.7</Text>
            </View>
          </TouchableOpacity>

          {/* Card para adicionar novo
          <TouchableOpacity style={[styles.facilitatorCard, styles.addCard]}>
            <View style={styles.addIcon}>
              <Plus size={24} color="#4A90E2" />
            </View>
            <Text style={styles.addText}>Indicar facilitador</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Carregando grupos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={headerSection}
        ListFooterComponent={footerSection}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
          />
        }
        extraData={groups}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default React.memo(HomeStudyGroup);
