import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Trending from "../../../../components/Navagation";
import {
  Bell,
  CircleUserRoundIcon,
  MenuIcon,
  ShoppingCart,
} from "lucide-react-native";
import ButtonIcons from "../../../../components/ButtonIcons";
import SideBar from "../../../../components/Sidebar";
import CardCustom from "../../../../components/CardCustom";
import QuoteCard from "../../../../components/MotivationalCard";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useBooks from "../../../../hooks/useBooks";

const HomeLibrary = () => {
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);
  const { books, loading } = useBooks();

  const data = [
    { type: "Acervo para Encomendas", data: books?.booksLoans || [] },
    { type: "Acervo para Reservas", data: books?.booksReserves || [] },
    { type: "Reflexões" },
  ];

  function renderSection({ item }) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.headerTitle}>{item.type}</Text>
        {item.type === "Acervo para Encomendas" ? (
          <CardCustom data={item.data} loan={true} />
        ) : item.type === "Acervo para Reservas" ? (
          <CardCustom data={item.data} reserves={true} />
        ) : item.type === "Reflexões" ? (
          <QuoteCard />
        ) : (
          <View style={styles.errorDataFlatlistContent}>
            <Text>Carregando item</Text>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.ContainerHeader}>
        <View style={styles.containerIcons}>
          <ButtonIcons
            color={"white"}
            size={30}
            handleChange={() => setIsSideBarOpen(!IsSideBarOpen)}
            Icon={({ color, size }) => <MenuIcon color={color} size={size} />}
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
            <ButtonIcons
              handleChange={() => router.push("/library/CartLoan")}
              color="#ffff"
              size={28}
              Icon={({ color, size }) => (
                <ShoppingCart color={color} size={size} />
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
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ flex: 1, justifyContent: "center" }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SideBar isOpen={IsSideBarOpen} setIsOpen={setIsSideBarOpen} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.type}
        renderItem={renderSection}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 40 }} // Espaço no final para scroll
      />
    </SafeAreaView>
  );
};

export default React.memo(HomeLibrary);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#003B73",
    paddingBottom: 100
  },
  sectionContainer: {
    paddingHorizontal: 10,
    gap: 15,
    marginBottom: 15,
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
    padding: 10,
    paddingVertical: 10, // Menos espaço no header
    backgroundColor: "#003B73",
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
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
  },
});