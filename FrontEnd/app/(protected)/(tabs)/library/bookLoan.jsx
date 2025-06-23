import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LinearGradient } from "expo-linear-gradient"
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Calendar,
  Users,
  Star,
  BookOpen,
  ArrowLeftIcon,
  MapPin,
  ShoppingCart,
} from "lucide-react-native"
import { router, useLocalSearchParams } from "expo-router"
import ButtonIcons from "../../../../components/ButtonIcons"
import React, { useEffect, useState } from "react"
import Trending from "../../../../components/Navagation"
import Button from "../../../../components/Button"
import CustomModal from "../../../../components/ModalCustom"

const BookLoan = () => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const params = useLocalSearchParams()
  const booksUnique = params.data ? JSON.parse(params.data) : []
  const book = booksUnique[0] || {
    nameBook: "Título não disponível",
    authorBook: "Autor desconhecido",
    overviewBook: "Sinopse não disponível",
    curiosityBook: "Nenhuma curiosidade disponível",
    image: null,
    tagsBook: "Sem tags",
    bookCategory: "",
    status_Available: "",
    bookQuantity: 0,
  }
  const [itemsCartQuantity, setItemsCartQuantity] = useState(0)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await AsyncStorage.getItem("@CartLoans")
        if (cartItems) {
          const parsedItems = JSON.parse(cartItems)
          setItemsCartQuantity(parsedItems.length)
        }
      } catch (error) {
        console.error("Erro ao carregar os itens do carrinho:", error)
      }
    }

    fetchCartItems()
  }, [])

  async function handleAddToCart(newItems) {
    try {
      const cartItem = JSON.parse(await AsyncStorage.getItem("@CartLoans") || '[]')
      // primeiro eu vou iterar no array de novos itens e depois no array de itens do carrinho
      const hasDuplicate = cartItem.some(itemCart => itemCart.idLibrary === newItems[0].idLibrary)

      if (hasDuplicate) {
        Alert.alert(
          "Erro",
          "Esse livro já está no carrinho. Iremos redirecioná-lo para o carrinho"
        ) 
        router.push("/library/CartLoan")
      } else {
        // adiciona o novo item ao carrinho
        const updatedItems = [...cartItem, ... newItems]
        await AsyncStorage.setItem("@CartLoans", JSON.stringify(updatedItems))
        setItemsCartQuantity((prev) => prev + 1)
        Alert.alert("Sucesso", "Livro adicionado ao carrinho")
        router.push("/library/CartLoan")
      }
    } catch (error) {
      console.error("Erro ao adicionar livro ao carrinho:", error)
      Alert.alert("Erro", "Não foi possível adicionar o livro ao carrinho")
    }
  }

  const imageUrl = book.image
    ? { uri: `http://192.168.1.17:3001/uploads/${book.image}` }
    : null

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Imagem de fundo com gradiente */}
        <ImageBackground
          source={imageUrl}
          style={styles.coverImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,59,115,0.8)", "rgba(0,59,115,0.5)", "transparent"]}
            style={styles.gradient}
          />

          {/* Cabeçalho */}
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
                  handleChange={() => router.push("/library/CartLoan")}
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

          {/* Informações do livro */}
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{book.nameBook}</Text>
            <Text style={styles.bookAuthor}>{book.authorBook}</Text>

            <View style={styles.ratingContainer}>
              <Star size={16} fill="#FFD700" color="#FFD700" />
              <Text style={styles.ratingText}>Nota: 4.5</Text>
            </View>

            <View style={styles.tagsContainer}>
              {book.bookCategory === "empréstimo" && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Encomenda</Text>
                </View>
              )}
              <View style={styles.tag}>
                <Text style={styles.tagText}>{book.tagsBook}</Text>
              </View>
              {book.status_Available === "disponível" &&
              book.bookQuantity > 0 ? (
                <View style={{ flexDirection: "row", gap: 15 }}>
                  <View style={[styles.tag, styles.availableTag]}>
                    <Text style={styles.tagText}>Disponível</Text>
                  </View>
                  <Text style={[styles.tag, styles.availableTag]}>
                    Em estoque
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row", gap: 15 }}>
                  <View style={[styles.tag, styles.unavailableTag]}>
                    <Text style={styles.tagText}>Disponível</Text>
                  </View>
                  <Text style={[styles.tag, styles.unavailableTag]}>
                    Fora de estoque
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>

        {/* Conteúdo principal */}
        <View style={styles.content}>
          <View style={styles.loanRulesSection}>
            <Text style={styles.sectionTitle}>Regras de Empréstimo</Text>

            {/* Cartão de Regras */}
            <View style={styles.rulesCard}>
              {/* 1. Elegibilidade */}
              <View style={styles.ruleItem}>
                <Users size={20} color="#60A3D9" style={styles.ruleIcon} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>
                    Quem pode pegar emprestado
                  </Text>
                  <Text style={styles.ruleDescription}>
                    • Membros cadastrados da sociedade
                    {"\n"}• Com contribuição em dia
                    {"\n"}• Sem pendências anteriores
                  </Text>
                </View>
              </View>

              {/* Divisor visual */}
              <View style={styles.divider} />

              {/* 2. Período de Empréstimo */}
              <View style={styles.ruleItem}>
                <Calendar size={20} color="#60A3D9" style={styles.ruleIcon} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>Período de Empréstimo</Text>
                  <Text style={styles.ruleDescription}>
                    • Prazo padrão: 30 dias • Renovável por mais 15 dias (se não
                    houver reservas) • Máximo de 2 renovações por livro
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />
              {/* 3. Devolução */}
              <View style={styles.ruleItem}>
                <Bookmark size={20} color="#60A3D9" style={styles.ruleIcon} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>Processo de Devolução</Text>
                  <Text style={styles.ruleDescription}>
                    • Devolver na biblioteca central
                    {"\n"}• Horário: 9h às 18h (segunda a sexta)
                    {"\n"}• Multa por atraso: R$ 2,00/dia
                    {"\n"}• Livros danificados deverão ser repostos
                  </Text>
                </View>
              </View>
            </View>

            {/* Dica importante */}
            <View style={styles.tipContainer}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>
                O não cumprimento das regras pode resultar em suspensão
                temporária do empréstimo.
              </Text>
            </View>
          </View>

          <View>
            <Button
              handlePress={() => {
                Alert.alert(
                  "Empréstimo de livro",
                  "Deseja confirmar o empréstimo?",
                  [
                    { text: "Não", style: "cancel" },
                    {
                      text: "Sim",
                      onPress: () => {
                        setModalVisible(true)
                      },
                    },
                  ]
                )
              }}
              opacityNumber={0.5}
              title={"Solicitar empréstimo do Livro"}
              textStyles={styles.textButton}
              buttonStyle={styles.buttonLoan}
            />

            <Text style={styles.sectionTitle}>Navegação</Text>
            <Trending
              navagations={[
                { name: "Sobre o livro" },
                {
                  name: "Empréstimo de livro",
                  path: "/library/bookLoan",
                  data: booksUnique,
                },
                { name: "Feedbacks", path: "/library/reviewBook" },
              ]}
            />
          </View>
        </View>
        {isModalVisible && (
          <CustomModal
            item={book}
            visible={isModalVisible}
            onClose={() => {
              console.log("Modal fechado")
              setModalVisible(false)
            }}
            title="Sua Encomenda"
            description="Atualize sua avaliação"
            confirmText="Ir para o carrinho"
            cartItemLength={itemsCartQuantity}
            onConfirm={(items) => handleAddToCart(items)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  loanRulesSection: {
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
  buttonLoan: {
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
})

export default React.memo(BookLoan)
