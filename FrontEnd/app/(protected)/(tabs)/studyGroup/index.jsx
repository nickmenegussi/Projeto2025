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
import React, { useCallback, useEffect, useState } from "react";
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
import Header from "../../../../components/Header";

const { width } = Dimensions.get("window");

const Index = () => {
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

  const headerSection = () => (
    <View style={styles.Container}>
          <Header
            title="Grupo de Estudos"
            onMenuPress={() => setIsSideBarOpen(!isSideBarOpen)}
          />
          <Trending
            navagations={[
              {
                type: "Navegação",
                name: "Acervo Encomendas",
                path: "/library/ReserveCollection",
              },
              { name: "Acervo Empréstimos", path: "/library/LoanCollection" },
              { name: "Buscar Livros", path: "/library/searchBook" },
              { name: "Minha Biblioteca", path: "/library/myLibrary" },
              {
                name: "Histórico de movimentos",
                path: "/library/historicalRequests",
              },
              { name: "Explorar", path: "/library/explore" },
            ]}
            textTitlle={false}
          />
        </View>
  );

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
          <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push('/studyGroup/facilitadores')}>
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
          <TouchableOpacity style={styles.facilitatorCard}                   onPress={() => router.push(`/studyGroup/facilitador/${facilitator.idFacilitadores}`)}>
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

export default React.memo(Index);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerContainer: {
    marginBottom: 20,
    paddingTop: 40,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
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
  }, Container: {
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    marginVertical: 10,
  },
  emptyText: {
    color: "#E0E0E0",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 12,
    fontSize: 16,
  },
  facilitatorsSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  facilitatorsList: {
    paddingVertical: 8,
  },
  facilitatorsContent: {
    paddingRight: 16,
  },
  facilitatorCard: {
    width: 150,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  facilitatorAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E9E9E9",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#34C759",
    borderWidth: 2,
    borderColor: "white",
  },
  facilitatorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  facilitatorRole: {
    fontSize: 14,
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    fontWeight: "600",
  },
  addCard: {
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4A90E2",
    borderStyle: "dashed",
    backgroundColor: "rgba(74, 144, 226, 0.05)",
  },
  addIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  addText: {
    fontSize: 14,
    color: "#4A90E2",
    textAlign: "center",
    fontWeight: "500",
  },
});
