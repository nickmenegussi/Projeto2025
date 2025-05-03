// Modal.js (Componente genérico)
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import FormField from "./FormField";
import { AirbnbRating, Rating } from "react-native-ratings";
import { XIcon } from "lucide-react-native";
import ButtonIcons from "./ButtonIcons";

const CustomModal = ({
  visible,
  onClose,
  title,
  onConfirm,
  confirmText,
  formField,
  descriptionReview,
  ratingReview,
  ratingReviewValue,
  onChangeRating,
  onChangeDescription,
}) => {

  return (
    <SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <Text style={styles.modalTitle}>{title}</Text>
              <ButtonIcons
                color={"black"}
                size={30}
                handleChange={onClose}
                Icon={({ color, size }) => <XIcon color={color} size={size}
                />
            }
              />
            </View>
            {formField === true ? (
              <FormField
                placeholder={"Digite seu comentário aqui"}
                title={"Comentário"}
                othersStyles={styles.backGroundFormField}
                titleForms={styles.titleForms}
                value={descriptionReview}
                handleChangeText={onChangeDescription}
              />
            ) : null}
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.modalTitle}>Avaliação</Text>
              {ratingReview === true ? (
                <Rating
                  count={5}
                  defaultRating={0}
                  size={20}
                  showRating={false}
                  selectedColor="#FFA500"
                  onFinishRating={onChangeRating}
                />
              ) : null}
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={onClose} />
              <Button title={confirmText} onPress={onConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContainer: {
    width: "95%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  backGroundFormField: {
    borderColor: "black",
    borderWidth: 1,
    maxWidth: "100%",
    marginBottom: 10,
  },
  titleForms: {
    marginTop: 20,
    color: "black",
  },
});

export default CustomModal;
