import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Bell, CircleUserRoundIcon, Menu } from "lucide-react-native";
import ButtonIcons from "../../../../components/ButtonIcons";
import Sidebar from "../../../../components/Sidebar";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = [
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
      icon: Bell,
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
  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} data={data} />

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
      />
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  conteinerFlatlist: {
    flexGrow: 1,
    padding: 15,
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
});
