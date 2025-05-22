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
import { ArrowLeftIcon, Bookmark } from "lucide-react-native";
import { router } from "expo-router";

export default function CartLoan() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      keyExtractor={(item, index) => item.idLibrary?.toString() || index.toString()}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: '50%' }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
         <View style={styles.card}>
            <View style={styles.row}>
              <Image source={{ uri: item.image ? `http://192.168.1.17:3001/uploads/${item.image}` : null }} style={styles.image} /> 
              <View style={styles.info}>
                <Text style={styles.title}>{item.nameBook}</Text>
                <Text style={styles.subtitle}>1 Item</Text>
                <Text style={styles.detailTitle}>Biblioteca Gabriel Delanne</Text>
                <Text style={styles.detail}>Endereço para retirada</Text>
                <Text style={styles.detailSmall}>Rua Exemplo, 123 - Centro, Esteio, RS</Text>
                <Text style={styles.detail}>Pagamento</Text>
                <Text style={styles.detailSmall}>Gratuito - A retirada deve ser feita em até 3 dias úteis</Text>
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
          <Text style={styles.total}>Total: {cartItems.length} item{cartItems.length > 1 ? 's' : ''}</Text>
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }, titleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
  }, containerHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: 16,
    marginTop: 40,
  }, containerHeaderTop: {
    flexDirection: "row", alignItems: "center", marginBottom: 40, gap: 10,
  }, total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "start",
    marginTop: 10,
  }, detail: {
    fontSize: 14,
    color: "#555",
  }, emptyText: {
    fontSize: 18,
    color: "#555",
  }, centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }, row: {
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
    gap: 4,
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
});
