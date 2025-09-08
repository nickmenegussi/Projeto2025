import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useContext } from "react";
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
import { AuthContext } from "../../../../context/auth";
import Header from "../../../../components/Header";
import styles from "./styles/CommunityStyle";
import Trending from "../../../../components/Navagation";

const Index = () => {
  const { user } = useContext(AuthContext);

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
              source={
                user?.image_profile
                  ? {
                      uri: `http://192.168.1.11:3001/uploads/${
                        user?.image_profile
                      }?t=${Date.now()}`,
                    }
                  : require("../../../../assets/images/default-profile.jpg")
              }
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteinerFlatlist}
        data={postData}
        keyExtractor={(item) => item.idPost.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.Container}>
            <Header title="Home" onMenuPress={() => setIsOpen(!isOpen)} />
            <Trending
              navagations={[
                {
                  name: "Palestras da Casa",
                  path: "/home/lectures",
                  data: [],
                },
                { name: "FAQ", path: "/home/faq" },
              ]}fetchUserLike
            />
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

export default React.memo(Index);
