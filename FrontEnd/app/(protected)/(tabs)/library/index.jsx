import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
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
import Header from "../../../../components/Header";

const HomeLibrary = () => {
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);
  const { books, loading } = useBooks();

  const data = [
    {
      type: "Acervo para Encomendas",
      data: books?.booksLoans?.slice(0, 6) || [],
      path: "/library/LoanCollection",
    },
    {
      type: "Acervo para Reservas",
      data: books?.booksReserves?.slice(0, 6) || [],
      path: "/library/ReserveCollection",
    },
    { type: "Reflexões" },
  ];

  function renderSection({ item }) {
    return (
      <View style={styles.sectionContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.headerTitle}>{item.type}</Text>
          <TouchableOpacity onPress={() => router.push(`${item.path}`)}>
            <Text style={styles.verTodos}>Ver todos</Text>
          </TouchableOpacity>
        </View>
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
      <Header
        title="Biblioteca"
        onMenuPress={() => setIsSideBarOpen(!IsSideBarOpen)}
        content={
          <View style={styles.actionButton}>
            <ButtonIcons
              handleChange={() => router.push("/library/Cart")}
              color="#ffff"
              size={28}
              Icon={({ color, size }) => (
                <ShoppingCart color={color} size={size} />
              )}
            />
          </View>
        }
      />
      <View style={styles.navigationContainer}>
        <Text style={styles.sectionTitle}>Navegação</Text>
        <Trending
          navagations={[
            { name: "Acervo Encomendas", path: "/library/ReserveCollection" },
            { name: "Acervo Empréstimos", path: "/library/LoanCollection" },
            { name: "Buscar Livros", path: "/library/searchBook" },
            { name: "Minha Biblioteca", path: "/library/myLibrary" },
            { name: "Histórico de movimentos", path: "/library/historicalRequests" },
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
        style={{flex: 1,}}
        keyExtractor={(item) => item.type}
        renderItem={renderSection}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent} // Espaço no final para scroll
      />
    </SafeAreaView>
  );
};

export default React.memo(HomeLibrary);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  sectionContainer: {
    gap: 15,
    marginBottom: 15,
  },  listContent: {
    paddingHorizontal: 16, // Mesmo padding horizontal do Study Group
    paddingBottom: 100,     // Mesmo padding bottom do Study Group
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
    alignItems: "center",

  }, avatarImage: {
    width: 42, 
    height: 42, 
    borderRadius: 21,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
  },
  verTodos: {
    color: "#60A3D9",
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 14,
  },
});
