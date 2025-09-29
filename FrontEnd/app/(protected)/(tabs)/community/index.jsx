import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  CircleUserRoundIcon,
  Download,
  Heart,
  Menu,
  MessageSquare,
  Plus,
} from "lucide-react-native";
import ButtonIcons from "../../../../components/ButtonIcons";
import Sidebar from "../../../../components/Sidebar";
import { router } from "expo-router";
import usePostMessage from "../../../../hooks/usePostMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../../services/api";
import LoadingScreen from "../../../../components/AcitivityIndicator";
import Header from "../../../../components/Header";
import Trending from "../../../../components/Navagation";
import SidebarWeb from "../../../../components/SidebarWeb";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLikes, setUserLikes] = useState({});
  const { postData, setPostData, refresh, loading } =
    usePostMessage(searchTerm);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const formatDate = (date) => {
    const dataRecebida = new Date(date);
    const horaLocal = new Date();
    const ms = horaLocal - dataRecebida;
    const min = Math.floor(ms / 60000);
    const hours = Math.floor(min / 60);
    const dias = Math.floor(hours / 24);

    if (min < 1) return "Agora mesmo";
    if (min < 60) return `${min} min`;
    if (hours < 24) return `${hours} h`;
    return `${dias} d`;
  };

  const dataSidebar = [
    { id: 1, label: "Perfil", route: "/settings" },
    { id: 2, label: "Conversas", route: "/community" },
    { id: 3, label: "Novos Tópicos", route: "/community/topic" },
    { id: 4, label: "Criar Tópicos", route: "/community/createTopic" },
    { id: 5, label: "Criar Postagem", route: "/community/createPost" },
    { id: 6, label: "Sair da Conta", route: "" },
  ];

  const currentUserId = useCallback(async () => {
    const userDataString = await AsyncStorage.getItem("@Auth:user");
    return userDataString ? JSON.parse(userDataString).id : null;
  }, []);

  const fetchUserLikes = useCallback(async () => {
    try {
      const userId = await currentUserId();
      if (!userId) return;
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.get(`/users/${userId}/likes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const likes = response.data;
      const likeMap = {};
      likes.forEach((like) => {
        likeMap[like.post_id] = true;
      });
      setUserLikes(likeMap);
    } catch (err) {
      console.error("Erro ao carregar likes do usuario:", err);
    }
  }, []);

  useEffect(() => {
    fetchUserLikes();
  }, []);

  const toggleLikePost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.post(
        `/post/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const liked = response.data.liked;
      setUserLikes((prev) => ({ ...prev, [postId]: liked }));
      setPostData((prevPosts) =>
        prevPosts.map((post) =>
          post.idPost === postId
            ? {
                ...post,
                likes_count: liked
                  ? post.likes_count + 1
                  : Math.max(0, post.likes_count - 1),
              }
            : post
        )
      );
    } catch (err) {
      console.error("Erro ao curtir post:", err);
      Alert.alert("Erro", "Falha ao processar o like.");
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={[styles.postCard, isMobile ? styles.mobilePostCard : styles.webPostCard]}>
        <View style={styles.headerRow}>
          {item.image_profile ? (
            <Image
              style={styles.profile}
              source={{
                uri: `http://192.168.1.19:3001/uploads/${item.image}`,
              }}
            />
          ) : (
            <Image
              source={require("../../../../assets/images/default-profile.jpg")}
              style={styles.profile}
              resizeMode="contain"
            />
          )}
          <View style={styles.headerPostCard}>
            <View>
              <Text style={styles.userName}>{item.nameUser}</Text>
              <Text style={styles.userHandle}>@{item.nameUser}</Text>
              {item.nameCategory && (
                <View style={styles.topicBadge}>
                  <Text style={styles.topicText}>
                    Relacionado a {item.nameCategory}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.postTime}>{formatDate(item.created_at)}</Text>
          </View>
        </View>

        <Text style={styles.postContent}>{item.content}</Text>
        {item.image && (
          <Image
            source={{ uri: `http://192.168.1.19:3001/uploads/${item.image}` }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.footerCardPost}>
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => toggleLikePost(item.idPost)}
          >
            <Heart
              color={userLikes[item.idPost] ? "red" : "white"}
              size={24}
              fill={userLikes[item.idPost] ? "red" : "none"}
            />
            <Text style={{ color: "#fff" }}>{item.likes_count}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => router.push(`/community/post/${item.idPost}`)}
          >
            <MessageSquare color="white" size={24} />
            <Text style={{ color: "#fff" }}>{item.comments_count}</Text>
          </TouchableOpacity>

          <View style={styles.footerItem}>
            <Download color="white" size={24} />
            <Text style={{ color: "#fff" }}>0</Text>
          </View>
        </View>
      </View>
    ),
    [userLikes, isMobile]
  );

  const renderFlatlistContainerMobile = () => {
    return (
      <>
        <FlatList
          contentContainerStyle={styles.conteinerFlatlist}
          data={postData}
          keyExtractor={(item) => item.idPost.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => {
            return (
              <View style={styles.headerComponent}>
                <View style={{flex: 1,}}>
                  <Header title="Home" onMenuPress={() => setIsOpen(!isOpen)} />
                  <Trending
                    navagations={[
                      {
                        type: "Navegação",
                        name: "Acervo Encomendas",
                        path: "/library/ReserveCollection",
                      },
                      {
                        name: "Acervo Empréstimos",
                        path: "/library/LoanCollection",
                      },
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
              </View>
            );
          }}
          ListEmptyComponent={() =>
            loading ? (
              <View style={styles.loadingContainer}>
                <LoadingScreen image={false} />
              </View>
            ) : (
              <Text style={styles.emptyText}>Nenhuma postagem encontrada</Text>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#4A90E2"]}
              tintColor={"#4A90E2"}
            />
          }
        />

        <TouchableOpacity
          style={styles.addPost}
          onPress={() => router.push("/community/createPost")}
        >
          <Plus color={"white"} size={24} />
        </TouchableOpacity>
      </>
    );
  };

  const renderViewContainerWeb = () => {
    return (
      <View style={styles.webContainer}>
        <SidebarWeb />
        
        <View style={styles.webMainContent}>
          <View style={styles.webContentContainer}>
            <View style={styles.webHeader}>
              <View>
                <Text style={styles.webTitle}>Comunidade</Text>
                <Text style={styles.webSubtitle}>
                  Conecte-se com outros leitores e compartilhe suas experiências
                </Text>
              </View>
              <TouchableOpacity
                style={styles.webAddPost}
                onPress={() => router.push("/community/createPost")}
              >
                <Plus color={"white"} size={20} />
                <Text style={styles.webAddPostText}>Nova Postagem</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.filterContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={[styles.filterPill, styles.filterPillActive]}>
                  <Text style={[styles.filterText, styles.filterTextActive]}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterPill}>
                  <Text style={styles.filterText}>Populares</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterPill}>
                  <Text style={styles.filterText}>Recentes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterPill}>
                  <Text style={styles.filterText}>Seguindo</Text>
                </TouchableOpacity>
              </ScrollView>
            </View> */}



            {loading ? (
              <View style={styles.loadingContainerWeb}>
                <LoadingScreen image={false} />
                <Text style={styles.loadingText}>Carregando postagens...</Text>
              </View>
            ) : postData.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Nenhuma postagem encontrada</Text>
                <Text style={styles.emptyStateSubtext}>
                  Seja o primeiro a compartilhar algo na comunidade!
                </Text>
                <TouchableOpacity
                  style={styles.emptyStateButton}
                  onPress={() => router.push("/community/createPost")}
                >
                  <Text style={styles.emptyStateButtonText}>Criar Primeira Postagem</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.postsGrid}>
                {postData.map((item) => (
                  <ScrollView key={item.idPost.toString()} style={styles.gridItem}>
                    {renderItem({ item })}
                  </ScrollView>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return isMobile ? renderFlatlistContainerMobile() : renderViewContainerWeb();
};

export default React.memo(Index);

const styles = StyleSheet.create({
  conteinerFlatlist: {
    padding: 16,
    flexGrow: 1,
    paddingBottom: 180,
    backgroundColor: "#003B73",
  },
  headerComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#003B73",
    paddingTop: 32,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logo: {
    width: 80,
    height: 80,
  },
  postCard: {
    padding: 15,
    backgroundColor: "#4A90E2",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  mobilePostCard: {
    marginBottom: 15,
  },
  webPostCard: {
    marginBottom: 0,
    height: '100%',
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerPostCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  userName: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userHandle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  postTime: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 2,
  },
  topicBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  topicText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },
  postContent: {
    fontSize: 15,
    color: "white",
    marginVertical: 12,
    lineHeight: 22,
  },
  postImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  footerCardPost: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  emptyText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    fontStyle: "italic",
  },
  addPost: {
    position: "absolute",
    right: 20,
    bottom: 140,
    borderRadius: 28,
    width: 56,
    height: 56,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  
  // Web Styles
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#003B73',
    minHeight: '100vh',
  },
  webMainContent: {
    flex: 1,
    marginLeft: 280,
    backgroundColor: '#f5f7fa',
  },
  webContentContainer: {
    flex: 1,
    padding: 30,
    maxWidth: 'auto',
    marginHorizontal: 'auto',
    width: '100%',
  },
  webHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    marginTop: 50
  },
  webTitle: {
    color: "#023047",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 4,
  },
  webSubtitle: {
    color: "#8ecae6",
    fontSize: 16,
    fontWeight: "500",
  },
  webAddPost: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  webAddPostText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 24,
    flexGrow: 0,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterPillActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  filterText: {
    color: '#023047',
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'flex-start',
  },
  gridItem: {
    minWidth: 400,
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    backgroundColor: 'white',
    borderRadius: 16,
    marginTop: 20,
  },
  emptyStateText: {
    color: '#023047',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    color: '#6c757d',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainerWeb: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    backgroundColor: 'white',
    borderRadius: 16,
    marginTop: 20,
  },
  loadingText: {
    marginTop: 16,
    color: '#6c757d',
    fontSize: 16,
  },
});