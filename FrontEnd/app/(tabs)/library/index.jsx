import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Trending from "../../../components/Navagation";
import { Bell, CircleUserRoundIcon, MenuIcon } from "lucide-react-native";
import ButtonIcons from "../../../components/ButtonIcons";
import SideBar from "../../../components/Sidebar";

const HomeLibrary = () => {
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SideBar isOpen={IsSideBarOpen} setIsOpen={setIsSideBarOpen} />
      <FlatList
        data={[{ type: "Gêneros" }]}
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.headerTitle}>{item.type}</Text>
            {item.type === "Gêneros" ? (
              <Text>Hello</Text>
            ) : (
              <View style={styles.errorDataFlatlistContent}>
                <Text>Carregando item</Text>
                <ActivityIndicator size="large" color="0000ff" />
              </View>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View contentContainerStyle={styles.ContainerHeader}>
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
                  Icon={({ color, size }) => <Bell color={color} size={size} />}
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
                    type: "Navegação",
                    name: "Acervo Encomendas",
                    path: "/library/ReservesCollection",
                  },

                  { name: "Acervo Empréstimos", 
                    path: "/home/LoansCollection" 
                  }, 
                  { name: "Buscar Livros", 
                    path: "/home/LoansCollection" 
                  }, { name: "Minha Biblioteca", 
                    path: "/home/LoansCollection" 
                  },{ name: "Histórico de movimentos", 
                    path: "/home/LoansCollection" 
                  },{ name: "Explorar", 
                    path: "/home/LoansCollection" 
                  }
                ] ?? []
              }
              textTitlle={true}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeLibrary;

const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "#003B73",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    marginBottom: 25,
  },
  errorDataFlatlistContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    justifyContent: "center",
  },
  ContainerHeader: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
  },
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  IconsContent: {
    flexDirection: "row",
    gap: 10,
  },
});
