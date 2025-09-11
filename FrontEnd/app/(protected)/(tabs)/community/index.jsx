import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
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

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLikes, setUserLikes] = useState({});
  const { postData, setPostData, refresh, loading } =
    usePostMessage(searchTerm);
  const [refreshing, setRefreshing] = useState(false);

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

  useCallback(() => {
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
      <View style={styles.postCard}>
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
    [userLikes]
  );

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} data={dataSidebar} />

      <FlatList
        contentContainerStyle={styles.conteinerFlatlist}
        data={postData}
        keyExtractor={(item) => item.idPost.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.headerComponent}>
             <View style={styles.Container}>
          <Header
            title="Home"
            onMenuPress={() => setIsOpen(!isOpen)}
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
          </View>
        )}
        ListEmptyComponent={() =>
          loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingScreen image={false} />
            </View>
          ) : (
            <Text style={styles.emptyText}>Nenhuma postagem encontrada</Text>
          )
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
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

export default React.memo(Index)


const styles = StyleSheet.create({
  conteinerFlatlist: {
    padding: 10,
    flexGrow: 1,
    paddingBottom: 180,
    backgroundColor: "#003B73", // Azul escuro que complementa o #4A90E2
  },
  headerComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#003B73",
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)", // Borda mais suave
  },
  logo: {
    width: 80,
    height: 80,
  },
  postCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#4A90E2", // Azul principal mantido
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
    backgroundColor: "rgba(255,255,255,0.2)", // Fundo branco transparente
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
    backgroundColor: "rgba(255,255,255,0.15)", // Fundo mais claro para contraste
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
    backgroundColor: "#4A90E2", // Mesma cor do postCard
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
});
