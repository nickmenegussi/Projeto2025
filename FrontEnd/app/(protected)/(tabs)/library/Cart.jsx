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
import {
  ArrowLeftIcon,
  Trash2,
  Edit3,
  ShoppingCartIcon,
  MapPin,
  CreditCard,
} from "lucide-react-native";
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
import Constants from "expo-constants";
import api from "../../../../services/api";

const CartLoan = () => {
  const { data, loading, refresh } = useCart();
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deletingItems, setDeletingItems] = useState({});
  const [updatingItems, setUpdatingItems] = useState({});
  const { enderecoUrlImage } = Constants.expoConfig.extra;

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
    setUpdatingItems((prev) => ({ ...prev, [Book_idLibrary]: true }));
    try {
      await updateQuantity({ Book_idLibrary, quantity });
      Alert.alert("Sucesso", "Quantidade atualizada com sucesso!");
      refresh();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a quantidade.");
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [Book_idLibrary]: false }));
    }
  };

  const handleDeleteCart = async (idCart) => {
    setDeletingItems((prev) => ({ ...prev, [idCart]: true }));
    try {
      await deleteBookInCart({ idCart });
      Alert.alert("Sucesso", "Item removido do carrinho!");
      refresh();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o item do carrinho.");
    } finally {
      setDeletingItems((prev) => ({ ...prev, [idCart]: false }));
    }
  };

  const getCategoryInfo = (category) => {
    const categories = {
      emprestimo: {
        name: "Empréstimo",
        color: "#007AFF",
      },
      reserva: {
        name: "Reserva",
        color: "#1565C0",
      },
      default: {
        name: "Categoria",
        color: "#666666",
      },
    };
    return categories[category] || categories.default;
  };

  const handleConfirmationLoan = async () => {
    setLoadingConfirm(true);
    try {
      const response = await api.post("/cart/cart/process-shopping", {
        cartItems: data,
      });

      if (response.data.success) {
        Alert.alert("Sucesso!", response.data.message);
        refresh();
      }
    } catch (error) {
      console.log
      Alert.alert("Erro", "Não foi possível confirmar os itens do carrinho.");
    } finally {
      setLoadingConfirm(false);
    }
  };

  if (!data || data.length === 0) {
    return (
      <View style={styles.centeredEmpty}>
        <View style={styles.emptyIconContainer}>
          <ShoppingCartIcon color="#FFFFFF" size={64} />
        </View>

        <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>

        <Text style={styles.emptySubText}>
          No entanto, percebemos que você já realizou alguns empréstimos. Que
          tal dar uma olhada neles?
        </Text>

        <TouchableOpacity
          style={styles.emptyPrimaryButton}
          onPress={() => router.push("/library/historicalShopping")}
        >
          <Text style={styles.emptyPrimaryButtonText}>
            Ver minhas Compras
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emptySecondaryButton}
          onPress={() => router.push("/library")}
        >
          <Text style={styles.emptySecondaryButtonText}>
            Explorar Biblioteca
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calcular totais para o resumo
  const totalItems = data.reduce((total, item) => total + item.quantity, 0);
  const totalBooks = data.length;

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
        <Text style={styles.headerTitle}>Carrinho de Compras</Text>
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
          onPress={() => router.push(`library/historicalShopping`)}
          style={styles.button}
        >
          <Text style={{ color: "#7D7D91" }}>Histórico de Compras</Text>
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
        renderItem={({ item }) => {
          const category = getCategoryInfo(item.bookCategory);

          return (
            <View style={styles.card}>
              <View
                style={[
                  styles.cardCategoryBook,
                  { backgroundColor: category.color },
                ]}
              >
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
              <View style={styles.cardHeader}>
                <Image
                  source={{
                    uri: item.image
                      ? `${enderecoUrlImage}/uploads/${item.image}`
                      : null,
                  }}
                  style={styles.image}
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.bookTitle} numberOfLines={2}>
                    {item.nameBook}
                  </Text>
                  <Text style={styles.bookAuthor} numberOfLines={1}>
                    {item.authorBook}
                  </Text>

                  {/* Nova seção de quantidade com controle visual */}
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>Quantidade:</Text>
                    <View style={styles.quantityBadge}>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                    </View>
                  </View>

                  <View style={styles.libraryInfo}>
                    <Text style={styles.libraryName}>
                      Biblioteca Gabriel Delanne
                    </Text>
                    <View style={styles.statusIndicator}>
                      <View style={[styles.statusDot, styles.available]} />
                      <Text style={styles.statusText}>
                        Disponível para retirada
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.footerColumn}>
                  <View style={styles.footerItem}>
                    <MapPin color="#007AFF" size={16} />
                    <View style={styles.footerTextContainer}>
                      <Text style={styles.footerTitle}>
                        Endereço para retirada
                      </Text>
                      <Text style={styles.footerText} numberOfLines={2}>
                        Sociedade Gabriel Delanne, Rua Coração de Maria, 341,
                        Centro - Esteio, RS
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.footerItem}>
                    <CreditCard color="#007AFF" size={16} />
                    <View style={styles.footerTextContainer}>
                      <Text style={styles.footerTitle}>Forma de pagamento</Text>
                      <Text style={styles.footerText} numberOfLines={2}>
                        Na livraria da sociedade. Aceitamos Pix, cartão de
                        crédito e débito.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            {/* Botão Editar */}
            <TouchableOpacity
              style={[
                styles.backLeftBtn,
                updatingItems[item.idLibrary] && styles.buttonDisabled,
              ]}
              onPress={() => {
                setVisibleModal(true);
                setSelectedItem(item);
              }}
              disabled={updatingItems[item.idLibrary]}
            >
              {updatingItems[item.idLibrary] ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Edit3 color="#fff" size={20} />
                  <Text style={styles.hiddenButtonText}>Editar</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Botão Remover */}
            <TouchableOpacity
              style={[
                styles.backRightBtn,
                deletingItems[item.idCart] && styles.buttonDisabled,
              ]}
              onPress={() => handleDeleteCart(item.idCart)}
              disabled={deletingItems[item.idCart]}
            >
              {deletingItems[item.idCart] ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Trash2 color="#fff" size={20} />
                  <Text style={styles.hiddenButtonText}>Remover</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <>
            {/* Resumo do pedido */}
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Resumo do Pedido</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total de itens:</Text>
                <Text style={styles.summaryValue}>{totalItems}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Livros diferentes:</Text>
                <Text style={styles.summaryValue}>{totalBooks}</Text>
              </View>

              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.summaryTotalLabel}>
                  Total para retirada:
                </Text>
                <Text style={styles.summaryTotalValue}>
                  {totalBooks} {totalBooks === 1 ? "item" : "itens"}
                </Text>
              </View>
            </View>

            {/* Botões de ação */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.primaryButton,
                  loadingConfirm && styles.buttonDisabled,
                ]}
                onPress={handleConfirmationLoan}
                disabled={loadingConfirm}
              >
                {loadingConfirm ? (
                  <ActivityIndicator size="small" color="#003B73" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    Confirmar Reserva
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => router.push("/library/bookLoan")}
              >
                <Text style={styles.secondaryButtonText}>
                  Adicionar mais itens
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />

      {/* Modal para editar quantidade */}
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
                "A quantidade selecionada é a mesma que já está no produto inserido no carrinho."
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
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },

  cardCategoryBook: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderTopLeftRadius: 16, // Borda superior esquerda
    borderTopRightRadius: 16, // Borda superior direita
  },

  categoryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 16,
    padding: 12,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
    lineHeight: 20,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontWeight: "500",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityLabel: {
    fontSize: 13,
    color: "#666",
    marginRight: 8,
  },
  quantityBadge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  quantityText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  libraryInfo: {
    marginTop: 4,
  },
  libraryName: {
    fontSize: 13,
    color: "#007AFF",
    fontWeight: "500",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  available: {
    backgroundColor: "#4CAF50",
  },
  unavailable: {
    backgroundColor: "#F44336",
  },
  statusText: {
    fontSize: 12,
    color: "#666",
  },
  cardFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  footerColumn: {
    flex: 1,
  },
  footerItem: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  footerTextContainer: {
    flex: 1,
    marginLeft: 8,
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
    width: "100%",
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 8,
  },

  // Botões Ocultos (Swipe)
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  backLeftBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    width: 75,
    height: "100%",
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    width: 75,
    height: "100%",
  },
  hiddenButtonText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  buttonDisabled: {
    opacity: 0.6,
  },

  // Resumo do Pedido
  orderSummary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003B73",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#666",
  },
  summaryValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginTop: 8,
    paddingTop: 12,
  },
  summaryTotalLabel: {
    fontSize: 16,
    color: "#003B73",
    fontWeight: "700",
  },
  summaryTotalValue: {
    fontSize: 16,
    color: "#003B73",
    fontWeight: "700",
  },

  // Container de Ações
  actionsContainer: {
    gap: 12,
    marginBottom: 30,
  },
  actionButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  primaryButtonText: {
    color: "#003B73",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Estados de Loading e Vazio
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
  centeredEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#003B73",
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  emptySubText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  emptyPrimaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyPrimaryButtonText: {
    color: "#003B73",
    fontSize: 16,
    fontWeight: "600",
  },
  emptySecondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "transparent",
  },
  emptySecondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Horários (comentado, mas mantido para referência)
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
});
