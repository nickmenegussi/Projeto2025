import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonIcons from "../../../../components/ButtonIcons";
import { Bell, Menu } from "lucide-react-native";
import Sidebar from "../../../../components/Sidebar";
import CustomNavagation from "../../../../components/CustomNavagation";

const Topic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dataSidebar = [
    { id: 1, label: "Perfil", route: "/settings" },
    { id: 2, label: "Conversas", route: "/community" },
    { id: 3, label: "Novos Tópicos", route: "/community/topic" },
    { id: 4, label: "Sair da Conta", route: "" },
    { id: 5, label: "Criar Postagem", route: "/community/createPost" },
  ];

  const renderData = [
    {
      id: 1,
      timestamp: "2h atrás",
      title: "Como melhorar meus estudos",
      content: "Estou buscando dicas para estudar mais eficientemente...",
      image: null,
    },
    {
      id: 2,
      timestamp: "Ontem",
      title: "Trabalho voluntário no centro espírita",
      content: "Participei do trabalho de domingo e foi incrível!",
      image: "https://placekitten.com/100/100",
    },
    {
      id: 5,
      timestamp: "Ontem",
      title: "Trabalho voluntário no centro espírita",
      content: "Participei do trabalho de domingo e foi incrível!",
      image: "https://placekitten.com/100/100",
    },
    {
      id: 4,
      timestamp: "Ontem",
      title: "Trabalho voluntário no centro espírita",
      content: "Participei do trabalho de domingo e foi incrível!",
      image: "https://placekitten.com/100/100",
    },
    {
      id: 3,
      timestamp: "3 dias atrás",
      title: "Sugestões de palestras",
      content: "Gostaria de sugerir uma palestra sobre mediunidade",
      image: null,
    },
  ];

  const dataNavigation = [
    {
      name: "Voluntariado",
      type: "Estudo",
      path: "/community/topic",
    },
    {
      name: "Trabalhos",
      type: "Voluntariado",
      path: "/",
    },
    {
      name: "Palestras",
      type: "Eventos",
      path: "/",
    },
  ];

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} data={dataSidebar} />

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

      <View style={styles.ContainerNavigation}>
        <CustomNavagation
          trendingItems={dataNavigation}
          sendData={false}
          otherStyles={true}
        />
      </View>
      <ImageBackground
        source={require("../../../../assets/images/Jesus-Cristo.png")}
        style={styles.featuredHeaderCard}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.overlay}>
          <View style={styles.headerPostCard}>
            <Text style={styles.timestamp}>{renderData[0].timestamp}</Text>
            <Text style={styles.postTitle}>{renderData[0].title}</Text>
            <Text style={styles.postContent}>{renderData[0].content}</Text>
          </View>
        </View>
      </ImageBackground>

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={renderData.slice(1)} // slice para não alterar o array original
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.textContainer}>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              <Text style={styles.postTitle} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text style={styles.postContent} numberOfLines={2} ellipsizeMode="tail">
                {item.content}
              </Text>
            </View>
            <Image
              source={
                item.image
                  ? { uri: item.image }
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
    height: 250,
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
});
