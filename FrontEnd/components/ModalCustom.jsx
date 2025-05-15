import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { X } from "lucide-react-native"; // Ícone mais moderno
import Button from "./Button"; // Substituir os Buttons nativos

const CustomModal = ({
  visible,
  onClose,
  title,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  formField,
  descriptionReview,
  ratingReview,
  onChangeRating,
  onChangeDescription
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Corpo */}
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

          {/* Rodapé */}
          <View style={styles.footer}>
            <Button 
              title={cancelText}
              variant="outline"
              onPress={onClose}
              style={styles.cancelButton}
              textStyle={styles.cancelText}
            />
            <Button 
              title={confirmText}
              onPress={onConfirm}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
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
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  input: {
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    marginTop: 16,
  },
  stars: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelText: {
    color: '#374151',
  },
  confirmButton: {
    backgroundColor: '#003B73',
  },
  confirmText: {
    color: '#FFFFFF',
  },
});

export default CustomModal;