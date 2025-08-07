import { View, Text, Image, TextInput, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonIcons from "../../../../components/ButtonIcons";
import { Bell, Menu } from "lucide-react-native";
import Sidebar from "../../../../components/Sidebar";
import Trending from "../../../../components/Navagation";
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

  const dataNavigation = [
    {
      name: "Evangelizacao",
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
          sendData={false} // envia o objeto data via params
          otherStyles={true}
        />
      <FlatList 
      data={[{id: 1, title: "Teste", content: "ADAJIDJIASDISAJDJASJDIASDJISAIJD", image: null,}]}

      />
      </View>
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
  // imagePerfil: {
  //   height: 50,
  //   width: 50,
  //   borderRadius: 25,
  //   borderWidth: 2,
  //   borderColor: "#FFF",
  // },
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
});
