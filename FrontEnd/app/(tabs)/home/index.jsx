import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  
} from "react-native";
import { SafeAreaView } from "react-native";
import {
  Bell,
  CircleUserRoundIcon,
  MenuIcon,
} from "lucide-react-native";
import ButtonIcons from "../../../components/ButtonIcons";
import Trending from "../../../components/Navagation";
import SideBar from "../../../components/Sidebar";
import RenderItemContent from "../../../components/RenderItemContent";

const Home = () => {
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mais recente", value: "newSet" },
    { label: "Mais antigo", value: "oldest" },
  ]);

  const sections = [
    { type: "Palestras da Casa" },
    { type: "Trabalho Voluntário" },
    { type: "Calendário de Eventos" },
    { type: "Esclarecimentos sobre o Centro Espírita" },
    { type: "Quem Somos - Sociedade Espírita Gabriel Delanne" },
    { type: "Avaliações do Centro Espírita" },
    { type: "Gêneros" } 
  ];

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <SideBar isOpen={IsSideBarOpen} setIsOpen={setIsSideBarOpen} />

        <FlatList
          data={sections}
          keyExtractor={(item) => item.type}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews={true}
          renderItem={({item}) => 
            <RenderItemContent item={item} />
          
          }
          ListHeaderComponent={() => (
            <View style={styles.Container}>
              <View style={styles.containerIcons}>
                <ButtonIcons
                  color={"white"}
                  size={30}
                  handleChange={() => setIsSideBarOpen(!IsSideBarOpen)}
                  Icon={({ color, size }) => (
                    <MenuIcon color={color} size={size} />
                  )}
                />
                <View style={styles.IconsContent}>
                  <ButtonIcons
                    color={"white"}
                    size={30}
                    Icon={({ color, size }) => (
                      <Bell color={color} size={size} />
                    )}
                  />
                  <ButtonIcons
                    color={"white"}
                    size={30}
                    Icon={({ color, size }) => (
                      <CircleUserRoundIcon color={color} size={size} />
                    )}
                  />
                </View>
              </View>
              <Trending
                navagations={
                  [
                    {
                      name: "Palestras da Casa",
                      path: "/home/lectures",
                      data: undefined,
                    },

                    { name: "FAQ", path: "/home/faq" },
                  ] ?? []
                }
              />
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
   safeAreaView: {
    flex: 1,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "#003B73",
  },
  
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  rightIcons: {
    flexDirection: "row",
    gap: 10,
  }, IconsContent: {
    flexDirection: "row",
    gap: 10,
  },   containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
});
