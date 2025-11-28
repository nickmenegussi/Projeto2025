import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import ButtonIcons from "../../../../components/ButtonIcons";
import { ArrowLeftIcon } from "lucide-react-native";
import { router } from "expo-router";
import useFavorite from "../../../../hooks/useFavorite";
import CardCustom from "../../../../components/CardCustom";

const MyLibrary = () => {
  const { favorite, loading } = useFavorite();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003B73" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Container principal */}
      <View style={styles.header}>
        <ButtonIcons
          color="#fff"
          handleChange={() => router.back()}
          size={24}
          accessibilityLabel="Voltar"
          Icon={({ color, size }) => (
            <ArrowLeftIcon color={color} size={size} />
          )}
        />
        <Text style={styles.headerTitle}>Minha Biblioteca</Text>
      </View>
      <View style={styles.containerHeader}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => router.push(`library/historicalLoans`)}
            style={styles.button}
          >
            <Text style={styles.linkText}>Outra navegação</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`library/favorites`)}
            style={[styles.button, styles.buttonActive]}
          >
            <Text style={styles.linkText}>Livros Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Text style={styles.textContainer}>Minha Biblioteca</Text> */}
      <Text style={styles.titleRenderItem}>Livros Favoritados</Text>
      <FlatList
        data={favorite}
        keyExtractor={(item) => item.Book_idLibrary.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerCardCustom}>
            <TouchableOpacity activeOpacity={0.8}>
              <CardCustom data={[item]} />
            </TouchableOpacity>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default MyLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
    paddingTop: 50,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  containerCardCustom: {
    gap: 15,
  },
  containerHeader: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 4,
    borderWidth: 1,
    backgroundColor: "#003B73",
    borderColor: "white",
    borderRadius: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "#60A3D9",
  },
  linkText: {
    color: "white",
    fontWeight: "500",
    fontSize: 13,
    textAlign: "center",
  },
  // textContainer: {
  //   color: "white",
  //   fontSize: 18,
  //   borderBottomWidth: 3,
  //   borderBottomColor: "#60A3D9",
  //   maxWidth: 200,
  //   textAlign: "left",
  //   paddingBottom: 4,
  //   marginTop: 30,
  // },
  titleRenderItem: {
    fontSize: 22,
    paddingHorizontal: 20,
    marginTop: 20,
    color: "white",
    marginBottom: 15,
  },
  flatListContent: {
    paddingLeft: 20,
    gap: 5,
  },
});
