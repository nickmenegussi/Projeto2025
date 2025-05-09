import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Trending from "../../../components/Navagation";
import { Bell, CircleUserRoundIcon, MenuIcon } from "lucide-react-native";
import ButtonIcons from "../../../components/ButtonIcons";
import SideBar from "../../../components/Sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../services/api";
import CardCustom from "../../../components/CardCustom";
import QuoteCard from "../../../components/MotivationalCard";
import { router } from "expo-router";

const HomeLibrary = () => {
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);
  const [data, setData] = useState({
    booksEncomendas: [],
    booksReserves: [],
  });

  useEffect(() => {
    viewBooks();
  }, []);

  async function viewBooks() {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.get("/library/library", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allBooks = response.data.data;
      const booksLoans = allBooks.filter(
        (books) => books.bookCategory === "encomenda"
      );
      const booksReserves = allBooks.filter(
        (books) => books.bookCategory === "reserva"
      );
      setData({ booksEncomendas: booksLoans, booksReserves: booksReserves });
    } catch (error) {
      if (error.response) {
        if (error.response.data.loginRequired === true) {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
          router.push("/sign-up");
        } else {
          console.log("Erro", error.response.data);
          Alert.alert("Erro", error.response.data.message);
        }
      } else {
        console.log("Erro", error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SideBar isOpen={IsSideBarOpen} setIsOpen={setIsSideBarOpen} />
      <FlatList
        data={[
          { type: "Acervo para Encomendas", data: data.booksEncomendas },
          { type: "Acervo para Reservas", data: data.booksReserves },
          { type: "Reflexões" },
        ]}
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.headerTitle}>{item.type}</Text>

            {item.type === "Acervo para Encomendas" ? (
              <CardCustom data={item.data} loan={true} reserves={false}/>
            ) : item.type === "Acervo para Reservas" ? (
              <CardCustom data={item.data} loan={false} reserves={true}/>
            ) : item.type === "Reflexões" ? (
              <QuoteCard />
            ) : (
              <View style={styles.errorDataFlatlistContent}>
                <Text>Carregando item</Text>
                <ActivityIndicator size="large" color="#FFFFFF" />
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
            <View>
              <View style={styles.navigationContainer}>
                <Text style={styles.sectionTitle}>Navegação</Text>
                <Trending
                  navagations={[
                    {
                      type: "Navegação",
                      name: "Acervo Encomendas",
                      path: "/library/reserves",
                    },
                    { name: "Acervo Empréstimos", path: "/library/loans" },
                    { name: "Buscar Livros", path: "/library/createBook" },
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

              <View style={styles.genresContainer}>
                <Text style={styles.sectionTitle}>Gêneros</Text>
                <Trending
                  navagations={[
                    { name: "Todos", path: "" },
                    { name: "Obras Básicas", path: "" },
                    { name: "Obras Complementares", path: "" },
                  ]}
                  textTitlle={false}
                />
              </View>
            </View>
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
  sectionContainer: {
    flex: 1,
    gap: 15, // Espaço entre o título e o conteúdo abaixo
    marginBottom: 15, // Espaço entre cada seção (ex: "Gêneros" e "Acervo para Encomendas")
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
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
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',  // Assumindo tema escuro pelo código anterior
  },
});
