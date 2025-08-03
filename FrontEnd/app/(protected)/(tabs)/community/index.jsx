import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import {
  CircleUserRoundIcon,
  Download,
  Heart,
  Menu,
  MessageSquare,
} from "lucide-react-native";
import ButtonIcons from "../../../../components/ButtonIcons";
import Sidebar from "../../../../components/Sidebar";
import { router, useFocusEffect } from "expo-router";
import usePostMessage from "../../../../hooks/usePostMessage";
import { addLikeToPost } from "../../../../services/ServiceLike";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../../services/api";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLikes, setUserLikes] = useState({});
  const { postData, setPostData, refresh, loading } =
    usePostMessage(searchTerm);

  const dataSidebar = [
    { id: 1, label: "Perfil", route: "/settings" },
    { id: 2, label: "Conversas", route: "/community" },
    { id: 3, label: "Novos Tópicos", route: "/notifications" },
    { id: 4, label: "Sair da Conta", route: "" },
    { id: 5, label: "Criar Postagem", route: "/community/createPost" },
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

  useFocusEffect(
    useCallback(() => {
      fetchUserLikes();

      refresh(); // atualiza os posts ao voltar para a tela
    }, [])
  );

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
                uri: `http://192.168.1.22:3001/uploads/${item.image}`,
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
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>
              {item.nameUser}
            </Text>
            <Text style={{ color: "white" }}>{item.created_at}</Text>
          </View>
        </View>
        <Text style={styles.postContent}>{item.content}</Text>
        {item.image && (
          <Image
            source={{ uri: `http://192.168.1.22:3001/uploads/${item.image}` }}
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
          <View style={styles.footerItem}>
            <TouchableOpacity
              style={styles.footerItem}
              onPress={() => router.push(`/community/post/${item.idPost}`)}
            >
              <MessageSquare color="white" size={24} />
              <Text style={{ color: "#fff" }}>{item.comments_count}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItem}>
            <Download color="white" size={24} />
            <Text style={{ color: "#fff" }}>{item.comments_count}</Text>
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
            <ButtonIcons
              color="white"
              size={30}
              handleChange={() => setIsOpen(true)}
              Icon={({ color, size }) => <Menu color={color} size={size} />}
            />
            <Image
              source={require("../../../../assets/images/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <ButtonIcons
              color="white"
              size={38}
              handleChange={() => router.push("/settings")}
              Icon={({ color, size }) => (
                <CircleUserRoundIcon color={color} size={size} />
              )}
            />
          </View>
        )}
        ListEmptyComponent={() =>
          loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text style={styles.emptyText}>Nenhuma postagem encontrada</Text>
          )
        }
      />
    </>
  );
};

export default React.memo(Index);

const styles = StyleSheet.create({
  conteinerFlatlist: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 130,
    backgroundColor: "#003B73",
  },
  headerComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#003B73",
    paddingTop: 20,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  logo: {
    width: 80,
    height: 80,
  },
  postCard: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#60A3D9",
    borderRadius: 16,
    gap: 5,
  },
  postContent: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  headerPostCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerCardPost: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
