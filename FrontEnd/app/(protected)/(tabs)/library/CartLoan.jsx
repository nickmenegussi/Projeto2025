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
import ButtonIcons from "../../../../components/ButtonIcons";
import { ArrowLeftIcon, Plus, CheckCircle, Clock } from "lucide-react-native";
import { router } from "expo-router";
import Button from "../../../../components/Button";

export default function CartLoan() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const schedules = [
    { id: 1, dia: "Segunda-feira", horario: "10:00 - 12:00", disponivel: true },
    { id: 2, dia: "Terça-feira", horario: "14:00 - 16:00", disponivel: true },
    { id: 3, dia: "Quarta-feira", horario: "10:00 - 12:00", disponivel: false },
    { id: 4, dia: "Quinta-feira", horario: "14:00 - 16:00", disponivel: true },
    { id: 5, dia: "Sexta-feira", horario: "10:00 - 12:00", disponivel: true },
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
        <ActivityIndicator size="large" color="#FFFFFF" />
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ButtonIcons
          color="#fff"
          handleChange={() => router.back()}
          size={24}
          Icon={({ color, size }) => (
            <ArrowLeftIcon color={color} size={size} />
          )}
        />
        <Text style={styles.headerTitle}>Carrinho de Empréstimos</Text>
        <View style={{ width: 24 }} /> {/* Spacer para alinhamento */}
      </View>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Button title={"Adicionar"} />
        <Button title={"Adicionar"} />
      </View>

      {/* Lista de Itens */}
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) =>
          item.idLibrary?.toString() || index.toString()
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
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
                <Text style={styles.bookTitle}>{item.nameBook}</Text>
                <Text style={styles.bookAuthor}>{item.authorBook}</Text>
                <Text style={styles.libraryName}>
                  Biblioteca Gabriel Delanne
                </Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.footerSection}>
                <Text style={styles.footerTitle}>Endereço para retirada</Text>
                <Text style={styles.footerText}>
                  Sociedade Gabriel Delanne, Rua Coração de Maria, 341, Centro -
                  Esteio, RS
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.footerSection}>
                <Text style={styles.footerTitle}>Forma de pagamento</Text>
                <Text style={styles.footerText}>
                  Na livraria da sociedade. Aceitamos Pix, cartão de crédito e
                  débito.
                </Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <>
            <View style={styles.scheduleContainer}>
              <Text style={styles.sectionTitle}>Horários Disponíveis</Text>

              {schedules.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.scheduleItem,
                    selectedSchedule === item.id && styles.scheduleItemSelected,
                    !item.disponivel && styles.scheduleItemDisabled,
                  ]}
                  onPress={() =>
                    item.disponivel && setSelectedSchedule(item.id)
                  }
                  disabled={!item.disponivel}
                  activeOpacity={0.7}
                >
                  <View style={styles.radioCircle}>
                    {selectedSchedule === item.id && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <View style={styles.scheduleInfo}>
                    <Text style={styles.dayText}>{item.dia}</Text>
                    <Text style={styles.timeText}>{item.horario}</Text>
                  </View>
                  {!item.disponivel && (
                    <Text style={styles.unavailableText}>Indisponível</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/library/MessageLoanConfirmed')}>
              <Text style={styles.actionButtonText}>Confirmar Reserva</Text>
            </TouchableOpacity>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    color: 'white',
    borderColor: "rgba(255,255,255,0.2)",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  libraryName: {
    fontSize: 13,
    color: "#007AFF",
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  footerSection: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    lineHeight: 16,
  },
  divider: {
    width: 1,
    backgroundColor: "#DDD",
    marginHorizontal: 12,
  },
  scheduleContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003B73",
    marginBottom: 12,
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    marginBottom: 8,
  },
  scheduleItemSelected: {
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#003B73",
  },
  scheduleItemDisabled: {
    opacity: 0.6,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#003B73",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#003B73",
  },
  scheduleInfo: {
    flex: 1,
  },
  dayText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  timeText: {
    fontSize: 13,
    color: "#666",
  },
  unavailableText: {
    fontSize: 12,
    color: "#F44336",
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginBottom: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: "#003B73",
    fontSize: 16,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
  emptyText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
