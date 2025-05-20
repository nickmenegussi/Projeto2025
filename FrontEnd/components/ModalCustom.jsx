import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { X } from "lucide-react-native";
import Button from "./Button";

// Componente OrderItem corrigido
const OrderItem = ({ item, onDecrease, onIncrease, currentQuantity }) => (
  <View style={styles.orderBookItem}>
    <View style={styles.bookInfo}>
      <Image source={item.image ? {uri: `http://192.168.1.17:3001/uploads/${item.image}`} : null} 
      style={{height: 180, width: '60%'}}/>
      <Text style={styles.bookTitle}>{item.nameBook}</Text>
      <Text style={styles.bookAuthor}>{item.authorBook}</Text>
    </View>

    <View style={styles.quantityControls}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={onDecrease}
      >
        <Text>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityText}>{currentQuantity}</Text>

      <TouchableOpacity
        style={styles.quantityButton}
        onPress={onIncrease}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CustomModal = ({
  visible,
  onClose,
  title,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  formField,
  item,
  cartItemLength,
  setCartItemLenth,
  descriptionReview,
  ratingReview,
  onChangeRating,
  onChangeDescription,
}) => {
  const itemsArray = Array.isArray(item) ? item : [item];
  
  // mapeia os itens para de uma lista que já existe com base na verificação acima
  const [cartItems, setCartItems] = useState(
    itemsArray.map(book => ({
      // pegar todos os dados antigos da lista que está sendo iterada
      ...book,
      quantity: 1, // Quantidade no carrinho
    }))
  );

  // Função para aumentar a quantidade
  const handleIncrease = (id) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.idLibrary === id && item.quantity < item.bookQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Função para diminuir a quantidade
  const handleDecrease = (id) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.idLibrary === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {formField && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Comentário</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu comentário aqui..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    value={descriptionReview}
                    onChangeText={onChangeDescription}
                  />
                </View>
              </View>
            )}
            
            {cartItems.length > 0 ? (
              <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                  <OrderItem
                    item={item}
                    currentQuantity={item.quantity}
                    onIncrease={() => handleIncrease(item.idLibrary)}
                    onDecrease={() => handleDecrease(item.idLibrary)}
                  />
                )}
                keyExtractor={(item) => item.idLibrary.toString()}
              />
            ) : (
              <ActivityIndicator size="large" color="black" />
            )}
            
            {ratingReview && (
              <View style={styles.ratingContainer}>
                <Text style={styles.label}>Avaliação</Text>
                <View style={styles.stars}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={28}
                    showRating={false}
                    onFinishRating={onChangeRating}
                    tintColor="#F9FAFB"
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Button
              title={cancelText}
              variant="outline"
              handlePress={onClose}
              style={styles.cancelButton}
              textStyle={styles.cancelText}
            />
            <Button
              title={confirmText}
              handlePress={() => onConfirm(cartItems)
              } // Passa os itens com as quantidades atualizadas
              style={styles.confirmButton}
              textStyle={styles.confirmText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  closeButton: {
    padding: 4,
    marginLeft: 10,
  },
  body: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  input: {
    fontSize: 16,
    color: "#111827",
    minHeight: 100,
    textAlignVertical: "top",
  },
  ratingContainer: {
    marginTop: 16,
  },
  stars: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  cancelText: {
    color: "#374151",
  },
  confirmButton: {
    backgroundColor: "#003B73",
  },
  confirmText: {
    color: "#FFFFFF",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  itemDetails: {
    flexDirection: "row",
    gap: 16,
  },
  itemQuantity: {
    color: "#6B7280",
  },
  itemPrice: {
    fontWeight: "600",
  },
  orderContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  // Título da seção
  orderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  // Item do livro
  orderBookItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Informações do livro
  bookInfo: {
    flex: 1,
    marginRight: 12,
  },

  bookTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },

  bookAuthor: {
    fontSize: 14,
    color: "#64748B",
  },

  // Controles de quantidade
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDF2F7",
    borderRadius: 8,
    padding: 4,
  },

  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginHorizontal: 8,
  },

  // Resumo do pedido
  orderSummary: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  summaryLabel: {
    fontSize: 14,
    color: "#64748B",
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },

  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },

  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003B73", // Cor da sua marca
  },

  // Campo de observações
  notesContainer: {
    marginTop: 16,
  },

  notesLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },

  notesInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
  },
});

export default CustomModal;
