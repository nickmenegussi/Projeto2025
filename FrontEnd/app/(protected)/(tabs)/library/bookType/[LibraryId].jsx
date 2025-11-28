import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bookmark,
  Share2,
  Calendar,
  Users,
  Star,
  ArrowLeftIcon,
  ShoppingCart,
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import ButtonIcons from "../../../../../components/ButtonIcons";
import React, { useEffect, useState } from "react";
import Trending from "../../../../../components/Navagation";
import Button from "../../../../../components/Button";
import CustomModal from "../../../../../components/ModalCustom";
import { addToCart, getCart } from "../../../../../services/ServiceCart";
import useBookDetail from "../../../../../hooks/useBookDetail";

const Bookemprestimo = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemsCartQuantity, setItemsCartQuantity] = useState(0);
  const params = useLocalSearchParams();
  const libraryId = params.LibraryId;
  const bookType = params.type === 'reserva' ? 'reservar' : "emprestar";
  const { book, loading, error } = useBookDetail(libraryId);
  console.log(bookType);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCart();
        setItemsCartQuantity(cartItems.length);
      } catch (error) {
        console.error("Erro ao carregar os itens do carrinho:", error);
      }
    };

    fetchCartItems();
  }, []);

  async function handleAddToCart() {
    if (!book) return;

    try {
      const cartItems = await getCart();
      const hasDuplicate = cartItems.some(
        (itemCart) => itemCart.Book_idLibrary === book.idLibrary
      );

      if (hasDuplicate) {
        Alert.alert(
          "Erro",
          "Esse livro já está no carrinho. Iremos redirecioná-lo para o carrinho"
        );
        
      } else {
        Alert.alert("Sucesso", "Livro adicionado ao carrinho");
        await addToCart({
          bookId: book[0].idLibrary,
          action: bookType,
          // iterar sobre um for para pegar o valor do quantity
          quantity: 1,
        });
        setItemsCartQuantity(cartItems.length + 1);
      }
    } catch (error) {
      console.error("Erro ao adicionar livro ao carrinho:", error);
      Alert.alert("Erro", "Não foi possível adicionar o livro ao carrinho");
    }
  }

  const getButtonText = () => {
    return bookType === "emprestimo"
      ? "Solicitar empréstimo do Livro"
      : "Solicitar reserva do Livro";
  };

  const getAlertTitle = () => {
    return bookType === "emprestimo"
      ? "Empréstimo de livro"
      : "Reserva de livro";
  };

  const getRulesTitle = () => {
    return bookType === "emprestimo"
      ? "Regras de Empréstimo"
      : "Regras de Reserva";
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !book[0]) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Livro não encontrado</Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => router.back()}
          >
            <Text style={styles.errorButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const imageUrl = book[0].image
    ? { uri: `http://192.168.1.12:3001/uploads/${book[0].image}` }
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ImageBackground
          source={imageUrl}
          style={styles.coverImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,59,115,0.8)", "rgba(0,59,115,0.5)", "transparent"]}
            style={styles.gradient}
          />

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <ArrowLeftIcon size={28} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.actionButton}>
                <ButtonIcons
                  color="#ffff"
                  size={30}
                  handleChange={() => setIsFavorite(!isFavorite)}
                  Icon={({ color, size }) => (
                    <Bookmark
                      color={color}
                      fill={isFavorite ? "#ffff" : "transparent"}
                      size={size}
                    />
                  )}
                />
              </View>
              <View style={styles.actionButton}>
                <ButtonIcons
                  handleChange={() => router.push("/library/Cart")}
                  color="#ffff"
                  size={28}
                  Icon={({ color, size }) => (
                    <ShoppingCart color={color} size={size} />
                  )}
                />
                {itemsCartQuantity > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>
                      {itemsCartQuantity}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{book[0].nameBook}</Text>
            <Text style={styles.bookAuthor}>{book[0].authorBook}</Text>

            <View style={styles.ratingContainer}>
              <Star size={16} fill="#FFD700" color="#FFD700" />
              <Text style={styles.ratingText}>Nota: 4.5</Text>
            </View>

            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {bookType === "emprestimo" ? "Empréstimo" : "Reserva"}
                </Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{book[0].tagsBook}</Text>
              </View>
              {book[0].status_Available === "disponível" &&
              book[0].bookQuantity > 0 ? (
                <View style={[styles.tag, styles.availableTag]}>
                  <Text style={styles.tagText}>Disponível</Text>
                </View>
              ) : (
                <View style={[styles.tag, styles.unavailableTag]}>
                  <Text style={styles.tagText}>Indisponível</Text>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.emprestimoRulesSection}>
            <Text style={styles.sectionTitle}>{getRulesTitle()}</Text>

            <View style={styles.rulesCard}>
              <View style={styles.ruleItem}>
                <Users size={20} color="#60A3D9" style={styles.ruleIcon} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>
                    Quem pode{" "}
                    {bookType === "emprestimo"
                      ? "pegar emprestado"
                      : "reservar"}
                  </Text>
                  <Text style={styles.ruleDescription}>
                    • Membros cadastrados da sociedade • Com contribuição em dia
                    • Sem pendências anteriores
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.ruleItem}>
                <Calendar size={20} color="#60A3D9" style={styles.ruleIcon} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>
                    {bookType === "emprestimo"
                      ? "Período de Empréstimo"
                      : "Período de Reserva"}
                  </Text>
                  <Text style={styles.ruleDescription}>
                    {bookType === "emprestimo"
                      ? "• Prazo padrão: 30 dias • Renovável por mais 15 dias • Máximo de 2 renovações"
                      : "• Reserva válida por 7 dias • Deve ser retirado no prazo • Notificação 2 dias antes"}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.ruleItem}>
                <Bookmark size={20} color="#60A3D9" style={styles.ruleIcon} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>
                    {bookType === "emprestimo"
                      ? "Processo de Devolução"
                      : "Processo de Retirada"}
                  </Text>
                  <Text style={styles.ruleDescription}>
                    {bookType === "emprestimo"
                      ? "• Devolver na biblioteca central\n• Horário: 9h às 18h (segunda a sexta)\n• Multa por atraso: R$ 2,00/dia"
                      : "• Retirar na biblioteca central\n• Horário: 9h às 18h (segunda a sexta)\n• Levar documento de identificação"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tipContainer}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>
                O não cumprimento das regras pode resultar em suspensão
                temporária do{" "}
                {bookType === "emprestimo" ? "empréstimo" : "reserva"}.
              </Text>
            </View>
          </View>

          <View>
            {book[0] && book[0].bookQuantity > 0 ? (
              <Button
                handlePress={() => {
                  Alert.alert(
                    getAlertTitle(),
                    `Deseja confirmar ${
                      bookType === "emprestimo" ? "o empréstimo" : "a reserva"
                    }?`,
                    [
                      { text: "Não", style: "cancel" },
                      {
                        text: "Sim",
                        onPress: () => {
                          setModalVisible(true);
                        },
                      },
                    ]
                  );
                }}
                opacityNumber={0.5}
                title={getButtonText()}
                textStyles={styles.textButton}
                buttonStyle={styles.buttonemprestimo}
              />
            ) : (
              <View style={styles.unavailableContainer}>
                <Text style={styles.unavailableIcon}>📚</Text>
                <Text style={styles.unavailableTitle}>
                  Livro Indisponível no Momento
                </Text>
                <Text style={styles.unavailableText}>
                  Este livro está temporariamente fora de estoque. Que tal
                  explorar outras obras incríveis enquanto aguarda?
                </Text>

                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => router.push("/library/explore")}
                >
                  <Text style={styles.exploreButtonText}>
                    Explorar Biblioteca
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.sectionTitle}>Navegação</Text>
            <Trending
              navagations={[
                {
                  name: "Sobre o livro",
                  path: `/library/aboutBook/${book[0].idLibrary}`,
                },
                {
                  name: "Feedbacks",
                  path: `/library/reviewBook/${book[0].idLibrary}`,
                },
              ]}
            />
          </View>
        </View>

        {isModalVisible && (
          <CustomModal
            item={book[0]}
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            title={`Sua ${bookType === "emprestimo" ? "Encomenda" : "Reserva"}`}
            description="Confirme a quantidade desejada"
            confirmText="Ir para o carrinho"
            cartItemLength={itemsCartQuantity}
            onConfirm={(items) => handleAddToCart(items)}
            customContent={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Adicione estes estilos
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
  loadingText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
    padding: 20,
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  errorButton: {
    backgroundColor: "#60A3D9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
    paddingBottom: 100,
  },
  container: {
    flex: 1,
  },
  coverImage: {
    width: "100%",
    height: 500,
    justifyContent: "space-between",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 15,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  bookInfo: {
    padding: 20,
    paddingBottom: 30,
  },
  bookTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bookAuthor: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 15,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 16,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    alignContent: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#60A3D9",
  },
  availableTag: {
    backgroundColor: "#50C878", // Verde pastel suave
    borderColor: "rgba(31, 110, 31, 0.5)",
    color: "white",
  },
  unavailableTag: {
    backgroundColor: "#FF6B6B",
    borderColor: "rgba(139, 0, 0, 0.5)",
    color: "white",
  },
  tagText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    backgroundColor: "#003B73",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  emprestimoRulesSection: {
    marginBottom: 30,
  },
  rulesCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginTop: 15,
    borderColor: "rgba(255,255,255,0.2)",
  },
  ruleItem: {
    flexDirection: "row",
    marginVertical: 12,
  },
  ruleIcon: {
    marginRight: 15,
    marginTop: 3,
  },
  ruleTextContainer: {
    flex: 1,
  },
  ruleTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  ruleDescription: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 8,
  },
  tipContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,215,0,0.15)",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  tipText: {
    color: "#FFD700",
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonemprestimo: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginTop: 0,
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF4C4C",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  unavailableContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  unavailableIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  unavailableTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  unavailableText: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  exploreButton: {
    backgroundColor: '#60A3D9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

});

export default React.memo(Bookemprestimo);
