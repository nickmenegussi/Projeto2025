import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  Bell,
  CircleUserRoundIcon,
  Download,
  Heart,
  Heater,
  Menu,
  MessageSquare,
} from "lucide-react-native";
import ButtonIcons from "../../../../components/ButtonIcons";
import Sidebar from "../../../../components/Sidebar";
import { router } from "expo-router";
import usePostMessage from "../../../../hooks/usePostMessage";
import { addLikeToPost } from "../../../../services/ServiceLike";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { postData, setPostData, refresh, loading, error } = usePostMessage();

  const dataSidebar = [
    {
      id: 1,
      label: "Perfil",
      route: "/settings",
    },
    {
      id: 2,
      label: "Conversas",
      route: "/community",
    },
    {
      id: 3,
      label: "Novos Tópicos",
      route: "/notifications",
    },
    {
      id: 4,
      label: "Sair da Conta",
      route: "",
    },
    {
      id: 5,
      label: "Criar Postagem",
      route: "/community/createPost",
    },
  ];

  const toggleLikePost = async (postId) => {
    try {
      const response = await addLikeToPost(postId);

      if (response?.success === false && response?.liked === true) {
        Alert.alert("Erro", "Você não pode curtir a mesma postagem já curtida");
        return;
      }

      if (response?.success) {
        // Atualiza o estado local diretamente
        setPostData((prevPosts) =>
          prevPosts.map((post) =>
            post.idPost === postId
              ? { ...post, likes_count: post.likes_count + 1 }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Erro ao curtir post:", error);
      Alert.alert("Erro ao curtir post", "Não foi possível curtir um post");
    }
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

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} data={dataSidebar} />

      <FlatList
        contentContainerStyle={styles.conteinerFlatlist}
        ListHeaderComponent={() => (
          <View style={styles.headerComponent}>
            <ButtonIcons
              color={"white"}
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
              color={"white"}
              size={38}
              handleChange={() => router.push("/settings")}
              Icon={({ color, size }) => (
                <CircleUserRoundIcon color={color} size={size} />
              )}
            />
          </View>
        )}
        data={postData}
        keyExtractor={(item) => item.idPost?.toString()}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.headerRow}>
              {item.image_profile ? (
                <Image
                  style={styles.profile}
                  source={{
                    uri: `http://192.168.1.17:3001/uploads/${item.image_profile}`,
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
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 17 }}
                >
                  {item.nameUser}
                </Text>
                <Text style={{ color: "white" }}>
                  {formatDate(item.created_at)}
                </Text>
              </View>
            </View>
            <Text style={styles.postContent}>{item.content}</Text>
            {item.image && (
              <Image
                source={{
                  uri: `http://192.168.1.17:3001/uploads/${item.image}`,
                }}
                style={styles.postImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.footerCardPost}>
              <View style={styles.footerItem}>
                <ButtonIcons
                  color={"white"}
                  size={26}
                  handleChange={() => {
                    toggleLikePost(item.idPost);
                  }}
                  Icon={({ color, size }) => (
                    <Heart color={color} size={size} />
                  )}
                />
                <Text style={{ color: "#fff" }}>{item.likes_count}</Text>
              </View>
              <View style={styles.footerItem}>
                <ButtonIcons
                  color={"white"}
                  size={26}
                  Icon={({ color, size }) => (
                    <MessageSquare color={color} size={size} />
                  )}
                />
                <Text style={{ color: "#fff" }}>{item.comments_count}</Text>
              </View>
              <View style={styles.footerItem}>
                <ButtonIcons
                  color={"white"}
                  size={26}
                  Icon={({ color, size }) => (
                    <Download color={color} size={size} />
                  )}
                />
                <Text style={{ color: "#fff" }}>{item.comments_count}</Text>
              </View>
            </View>
          </View>
        )}
        refreshing={loading}
        onRefresh={refresh}
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
    flexDirection: "row", // <- ALINHA HORIZONTALMENTE
    alignItems: "center", // <- ALINHA VERTICALMENTE OS ITENS
    gap: 4, // <- opcional: adiciona espaçamento entre ícone e número
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center", // alinha verticalmente
    gap: 10, // se sua versão do RN suportar
  },
});
