import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonIcons from "../../../../components/ButtonIcons";
import { Bell, Menu } from "lucide-react-native";
import Sidebar from "../../../../components/Sidebar";
import socket from "../../../../services/socket";
import api from "../../../../services/api";
import useCategory from "../../../../hooks/useCategory";

const Topic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const { categories, selectedCategory, fetchCategory } = useCategory();

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
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        let response = [];
        if (selectedCategory) {
          response = await fetchCategory(selectedCategory);
        } else {
          const res = await api.get("/topic/topic");
          response = res.data.data || [];
        }
        setTopics(response);
      } catch (error) {
        console.log("Erro ao buscar tópicos:", error);
      }
    };

    fetchTopics();

    socket.on("newTopic", (topic) => {
      setTopics((prev) => [topic, ...prev]);
    });

    return () => socket.off("newTopic");
  }, [selectedCategory]);

  const listTopics = topics.slice(1);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} data={dataSidebar} />

      {/* Header fixo */}
      <View>
        {/* Header top (menu + busca + bell) */}
        <View style={styles.headerContent}>
          <ButtonIcons
            color="white"
            size={30}
            handleChange={() => setIsOpen(true)}
            Icon={({ color, size }) => <Menu color={color} size={size} />}
          />
          <TextInput
            placeholderTextColor="#999"
            placeholder="Buscar..."
            style={styles.TextInput}
          />
          <ButtonIcons
            color="white"
            size={30}
            Icon={({ color, size }) => <Bell color={color} size={size} />}
          />
        </View>

        {/* Categorias fixas */}
        <FlatList
          data={categories}
          keyExtractor={(item) => item.idCategory.toString()}
          horizontal
          contentContainerStyle={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 20,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                selectedCategory?.idCategory === item.idCategory &&
                  styles.categoryTabActive,
              ]}
              onPress={() => fetchCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory?.idCategory === item.idCategory &&
                    styles.categoryTextActive,
                ]}
              >
                {item.nameCategory || "Sem nome"}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Destaque fixo */}
        {topics[0] && (
          <ImageBackground
            source={require("../../../../assets/images/Jesus-Cristo.png")}
            style={styles.featuredHeaderCard}
            imageStyle={{ borderRadius: 8 }}
          >
            <View style={styles.overlay}>
              <View style={styles.headerPostCard}>
                <Text style={styles.timestamp}>{formatDate(topics[0].created_at)}</Text>
                <Text style={styles.postTitle}>{topics[0].title}</Text>
                <Text style={styles.postContent}>{topics[0].description}</Text>
              </View>
            </View>
          </ImageBackground>
        )}
      </View>

      <FlatList
        data={listTopics}
        keyExtractor={(item, index) =>
          item.idTopic ? item.idTopic.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.textContainer}>
              <Text style={styles.timestamp}>{formatDate(item.created_at)}</Text>
              <Text
                style={styles.postTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
              <Text
                style={styles.postContent}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>
            </View>
            <Image
              source={
                item.image
                  ? {  uri: `http://192.168.1.19:3001/uploads/${item.image}` }
                  : require("../../../../assets/images/default-profile.jpg")
              }
              style={styles.postImage}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ marginVertical: 10, paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default Topic;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingVertical: 30,
    padding: 10,
    backgroundColor: "#003B73",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 35,
  },
  TextInput: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 15,
  },
  ContainerNavigation: {
    borderTopWidth: 1,
    borderTopColor: "white",
    marginVertical: 15,
  },

  featuredHeaderCard: {
    height: 230,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.8)", // camada branca semi-transparente
    padding: 15,

    justifyContent: "center",
  },
  headerPostCard: {
    // aqui você pode ajustar margem ou alinhamento
  },

  postCard: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 8,
    padding: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  postContent: {
    fontSize: 14,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  separator: {
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 10,
  },
  postImage: {
    height: 65,
    width: 65,
    borderRadius: 10,
    backgroundColor: "black",
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#0055A5",
    minWidth: 100, // garante largura mínima
    alignItems: "center", // centraliza o texto
    justifyContent: "center",
  },

  categoryTabActive: {
    backgroundColor: "#FFD700",
  },

  categoryText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14, // reduzindo pra caber mais texto
    textAlign: "center", // centraliza
  },

  categoryTextActive: {
    color: "black",
    fontWeight: "700",
  },
});
