import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import ButtonIcons from "../../../../components/ButtonIcons";
import { ArrowLeftIcon } from "lucide-react-native";

const HistoricalLoans = () => {
  const data = [
    {
      id: 1,
      nomeLivro: "Teste",
      image: "81hJ58BD95L.jpg.jpg",
      nomeAutor: "Teste autor",
      biblioteca: "Gabriel Delanne",
      status: "Emprestado",
    },
  ];

  return (
    <FlatList
      contentContainerStyle={styles.ContainerFlatlist}
      data={data}
      renderItem={({ item }) => (
        <View styles={styles.ContainerRenderItem}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image
                source={{
                  uri: item.image
                    ? `http://192.168.1.17:3001/uploads/${item.image}`
                    : null,
                }}
                style={styles.image}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.bookTitle}>{item.nomeLivro}</Text>
                <Text style={styles.bookAuthor}>{item.nomeLivro}</Text>
                <Text style={styles.libraryName}>
                  Biblioteca Gabriel Delanne
                </Text>
                {item.status === "Emprestado" ? (
                  <TouchableOpacity style={styles.ButtonStatus}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Livro Emprestado
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.ButtonStatusUnConfirmed}>
                    <Text style={{ color: "yellow", fontWeight: "bold" }}>
                      Aguardando Confirmação
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      )}
      ListHeaderComponent={() => (
        <>
          <View style={styles.header}>
            <ButtonIcons
              color="#fff"
              handleChange={() => router.back()}
              size={24}
              Icon={({ color, size }) => (
                <ArrowLeftIcon color={color} size={size} />
              )}
            />
            <Text style={styles.headerTitle}>Histórico de Empréstimos</Text>
          </View>
          <View style={styles.ContainerHeader}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={styles.button}
              >
                <Text style={styles.linkText}>Aguardando confirmação</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push(`library/historicalLoans`)}
                style={[styles.button, styles.buttonActive]}
              >
                <Text style={styles.linkText}>Histórico de Reservas</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    />
  );
};

export default HistoricalLoans;

const styles = StyleSheet.create({
  ContainerFlatlist: {
    flex: 1,
    padding: 10,
    backgroundColor: "#003B73",
  },
  ContainerHeader: {
    flexDirection: "column",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#003B73",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#EEE",
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 15,
    color: "#666",
    marginBottom: 2,
  },
  libraryName: {
    fontSize: 13,
    color: "#007AFF",
    fontWeight: "500",
    marginBottom: 8,
  },
  ButtonStatus: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: "center",
    backgroundColor: "#2ecc71",
    marginTop: 8,
  },
  ButtonStatusUnConfirmed: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: "center",
    backgroundColor: "#2ecc71",
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "auto",
    padding: 4,
    marginHorizontal: "auto",
    marginVertical: 12,
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
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    fontSize: 13,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#003B73",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
