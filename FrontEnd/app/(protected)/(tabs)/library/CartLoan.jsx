import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import ButtonIcons from "../../../../components/ButtonIcons";
import { ArrowLeftIcon, Trash2, Edit3 } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import useCart from "../../../../hooks/useCart";
import React, { useContext, useEffect, useState } from "react";
import {
  deleteBookInCart,
  updateQuantity,
} from "../../../../services/ServiceCart";
import { createLoanConfirmation } from "../../../../services/ServiceLoan";
import CustomModal from "../../../../components/ModalCustom";
import useLoan from "../../../../hooks/useLoan";

const CartLoan = () => {
  const { data, loading, refresh } = useCart();
  const { loan } = useLoan();
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const schedules = [
    { id: 1, dia: "Segunda-feira", horario: "10:00 - 12:00", disponivel: true },
    { id: 2, dia: "Terça-feira", horario: "14:00 - 16:00", disponivel: true },
    { id: 3, dia: "Quarta-feira", horario: "10:00 - 12:00", disponivel: false },
    { id: 4, dia: "Quinta-feira", horario: "14:00 - 16:00", disponivel: true },
    { id: 5, dia: "Sexta-feira", horario: "10:00 - 12:00", disponivel: true },
  ];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  const handleUpdateQuantity = async (Book_idLibrary, quantity) => {
    try {
      await updateQuantity({ Book_idLibrary, quantity });
      Alert.alert("Sucesso", "Quantidade atualizada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a quantidade.");
    }
  };

  const handleDeleteCart = async (idCart) => {
    try {
      await deleteBookInCart({ idCart });
      Alert.alert("Sucesso", "Carrinho deletado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar o item do carrinho.");
    }
  };

  const handleConfirmationLoan = async () => {
    setLoadingConfirm(true);
    try {
      // aqui eu tenho que iterar de novo nos items que tem em data por conta de que eu estou pegando os dados que estão vindo da api que mostra os carrinhos com os itens dentro
      for (const item of data) {
        await createLoanConfirmation({
          Cart_idCart: item.idCart,
          Book_idLibrary: item.idLibrary,
          quantity: item.quantity,
        });
      }
      Alert.alert("Sucesso", "Reserva confirmada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível confirmar a reserva.");
    } finally {
      setLoadingConfirm(false);
    }
  };

  if (!data || (data.length === 0 && loan)) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>
          Você não tem nenhum item no carrinho.
        </Text>
        <Text style={styles.subText}>
          No entanto, percebemos que você já realizou alguns empréstimos. Que
          tal dar uma olhada neles?
        </Text>

        <TouchableOpacity
          style={styles.buttonNoItemCart}
          onPress={() => router.push("/library/historicalLoans")}
        >
          <Text style={styles.buttonTextNoItemCart}>Ver meus Empréstimos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push(``)}
          activeOpacity={0.7}
          style={[styles.button, styles.buttonActive]}
        >
          <Text style={styles.linkText}>Aguardando confirmação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(`library/historicalLoans`)}
          style={styles.button}
        >
          <Text style={{ color: "#7D7D91" }}>Histórico Empréstimos</Text>
        </TouchableOpacity>
      </View>

      <SwipeListView
        data={data}
        keyExtractor={(item, index) =>
          item.idLibrary?.toString() || index.toString()
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        leftOpenValue={75}
        rightOpenValue={-75}
        previewOpenDelay={3000}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image
                source={{
                  uri: item.image
                    ? `http://192.168.1.10:3001/uploads/${item.image}`
                    : null,
                }}
                style={styles.image}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.bookTitle}>{item.nameBook}</Text>
                <Text style={styles.bookAuthor}>{item.authorBook}</Text>
                <Text style={styles.libraryName}>
                  Quantidade items: {item.quantity}
                </Text>
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
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.backLeftBtn}
              onPress={() => {
                setVisibleModal(true);
                setSelectedItem(item);
              }}
            >
              <Edit3 color="#fff" size={20} />
              <Text style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>
                Editar
              </Text>
            </TouchableOpacity>

            {/* Direita: Remover */}
            <TouchableOpacity
              style={styles.backRightBtn}
              onPress={() => handleDeleteCart(item.idCart)}
            >
              <Trash2 color="#fff" size={20} />
              <Text style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>
                Remover
              </Text>
            </TouchableOpacity>
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
            <View style={{ flex: 1, gap: 15, marginTop: 15, marginBottom: 70 }}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  handleConfirmationLoan();
                }}
                disabled={loadingConfirm}
              >
                {loadingConfirm ? (
                  <ActivityIndicator size="small" color="003B73" />
                ) : (
                  <Text style={styles.actionButtonText}>Confirmar Reserva</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.back("/library/bookLoan")}
              >
                <Text style={styles.actionButtonText}>
                  Adicionar mais itens
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
      {selectedItem && (
        <CustomModal
          visible={visibleModal}
          onClose={() => {
            setVisibleModal(false);
            setSelectedItem(null);
          }}
          title={"Atualizar quantidade de itens"}
          item={selectedItem}
          onConfirm={(items) => {
            if (selectedItem.quantity == items[0].quantity) {
              Alert.alert(
                "Atenção!",
                "a quantidade selecionada é a mesma que já está no produto inserido no carrinho."
              );
            } else {
              handleUpdateQuantity(items[0].idLibrary, items[0].quantity);
              setVisibleModal(false);
              setSelectedItem(null);
              refresh();
            }
          }}
        />
      )}
    </View>
  );
};

export default React.memo(CartLoan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
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
    gap: 10,
    padding: 5,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    color: "white",
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
    padding: 15,
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
  buttonStyle: {
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "95%",
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
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },

  backLeftBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF", // azul para Editar
    width: 75,
    height: "100%",
  },

  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30", // vermelho para Remover
    width: 75,
    height: "100%",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonNoItemCart: {
    backgroundColor: "#4B8DF8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonTextNoItemCart: {
    color: "#fff",
    fontSize: 16,
  },
});
