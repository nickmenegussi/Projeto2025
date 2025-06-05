import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonIcons from "../../../components/ButtonIcons";
import { ArrowLeftIcon, Bookmark, Plus } from "lucide-react-native";
import { router } from "expo-router";

export default function CartLoan() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const schedules = [
    { dia: "Segunda-feira", horario: "10:00 - 12:00" },
    { dia: "Terça-feira", horario: "14:00 - 16:00" },
    { dia: "Quarta-feira", horario: "10:00 - 12:00" },
    { dia: "Quinta-feira", horario: "14:00 - 16:00" },
    { dia: "Sexta-feira", horario: "10:00 - 12:00" },
  ];
  const loadCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@CartLoans");
      if (jsonValue) {
        setCartItems(JSON.parse(jsonValue));
      } else {
        setCartItems([]);
      }
    } catch (e) {
      console.error("Erro ao carregar carrinho:", e);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cartItems}
      keyExtractor={(item, index) =>
        item.idLibrary?.toString() || index.toString()
      }
      style={styles.container}
      contentContainerStyle={{ paddingBottom: "100%" }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              source={{
                uri: item.image
                  ? `http://192.168.1.17:3001/uploads/${item.image}`
                  : null,
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title}>Título: {item.nameBook}</Text>
              <Text style={styles.subtitle}>Itens: {item.quantity}</Text>
              <Text style={styles.title}>
                Autor do Livro: {item.authorBook}
              </Text>
              <Text style={styles.subtitle}>Biblioteca Gabriel Delanne</Text>
            </View>
          </View>
          <View style={styles.footerContent}>
            <View style={{ width: "50%" }}>
              <Text style={styles.titleFooter}>Endereço para retirada</Text>
              <Text style={styles.detailSmall}>
                Sociedade Gabriel Delanne, Rua Coração de Maria, 341, Centro -
                Esteio, Rs
              </Text>
            </View>
            <View
              style={{
                height: "100%",
                width: 3,
                backgroundColor: "black",
                marginVertical: 5,
              }}
            ></View>

            <View style={{ width: "50%" }}>
              <Text style={styles.titleFooter}>Pagamento</Text>{" "}
              <Text style={styles.detailSmall}>
                Na livraria da sociedade Gabriel Delanne. Aceitamos Pix/cartão
                de crédtio e débito.
              </Text>
            </View>
          </View>
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={styles.containerHeader}>
          <View style={styles.containerHeaderTop}>
            <ButtonIcons
              color="#fff"
              handleChange={() => router.back()}
              size={30}
              Icon={({ color, size }) => (
                <ArrowLeftIcon color={color} size={size} />
              )}
            />
            <Text style={styles.titleHeader}>Carrinho de Empréstimos</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.total}>Total de itens: {cartItems.length}</Text>

            <ButtonIcons
              color="#fff"
              handleChange={() => router.back()}
              size={30}
              Icon={({ color, size }) => <Plus color={color} size={size} />}
            />
            <Text style={styles.detail}>Adicionar mais itens</Text>
          </View>
        </View>
      )}
      ListFooterComponent={() => (
        <View style={styles.scheduleContainer}>
          <Text style={styles.sectionTitle}>Horários Disponíveis</Text>

          {schedules.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.scheduleItem,
                selectedIndex === index && styles.scheduleItemSelected,
              ]}
              onPress={() => setSelectedIndex(index)}
              activeOpacity={0.7}
            >
              <View style={styles.radioCircle}>
                {selectedIndex === index && <View style={styles.radioDot} />}
              </View>
              <View>
                <Text style={styles.dayText}>{item.dia}</Text>
                <Text style={styles.timeText}>{item.horario}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#003B73",
    paddingVertical: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 40,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  containerHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: 16,
    marginTop: 40,
  },
  containerHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "start",
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    flexDirection: "column",
    gap: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  detailTitle: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginTop: 8,
  },
  detailSmall: {
    fontSize: 13,
    color: "#777",
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 5,
    marginTop: 8,
    marginBottom: 8,
  },
  titleFooter: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 4,
  },
  scheduleContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 12,
  },

  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0059b3",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },

  scheduleItemSelected: {
    backgroundColor: "#007bff",
    borderWidth: 2,
    borderColor: "#fff",
  },

  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  timeText: {
    fontSize: 14,
    color: "#d0e6ff",
  },
});
