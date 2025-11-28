import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { ArrowLeftIcon } from "lucide-react-native";
import { SafeAreaView } from "react-native";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import handleApiError from "../utils/handleApiError";
import Toast from "react-native-toast-message";

export default function OtpSignIn() {
  const { OtpVerification, otpDigits, OtpSendEmail } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [sendAgainOtpCode, setSendAgainOtpCode] = useState(false);
  async function OtpVerify() {
    if (!sendAgainOtpCode && otp.length > 4) {
      Toast.show({
        type: "info",
        text1: "O tamanho do código não deve ultrapassar 4 dígitos",
        position: "bottom",
      });
      return;
    }

    try {
      const email = await AsyncStorage.getItem("@Auth:email");
      if (!email) {
        Toast.show({
          type: "error",
          text1: "Email não encontrado",
          position: "bottom",
        });
        return;
      }

      if (sendAgainOtpCode) {
        await OtpSendEmail(email);
        setSendAgainOtpCode(false);
      } else {
        await OtpVerification(otp, email);
      }
    } catch (error) {
      handleApiError(error, true);
    }
  }

  return (
    <LinearGradient
      colors={["#003B73", "#60A3D9"]}
      end={{ x: 0, y: 1 }}
      locations={[0, 4]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => router.push("/emailOtp")}
            style={styles.returntoPage}
          >
            <ArrowLeftIcon color="white" size={30} />
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Verificação de Código</Text>
              <Text style={[styles.text, styles.subtitle]}>
                Insira o código de verificação que foi para a sua caixa de email
                para continuar!
              </Text>
            </View>
            <FormField
              keyboardType="numeric"
              placeholder={"Digite o código aqui"}
              handleChangeText={(text) => setOtp(text)}
              value={otp}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Enviar Novo Código"
                textStyles={styles.TextButton}
                buttonStyle={styles.colorButton}
                othersStyles={styles.Button}
                handlePress={() => {
                  OtpVerify();
                  setSendAgainOtpCode(true);
                }}
              />
              <Button
                title="Enviar Código"
                textStyles={styles.TextButton}
                buttonStyle={styles.colorButton}
                othersStyles={styles.Button}
                handlePress={OtpVerify}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  returntoPage: {
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    width: 40,
    maxWidth: 40,
    height: 40,
    maxHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 30,
    left: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 130,
  },
  headerContainer: {
    width: "92%",
    alignItems: "flex-start", // alinha os textos à esquerda
    marginTop: 20,
    gap: 6, // espaçamento entre título e subtítulo
  },
  text: {
    color: "#FFFFFF",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    width: 400,
    right: 5,
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 330,
  },
  colorButton: {
    backgroundColor: "white",
  },
  TextButton: {
    color: "black",
  },
  buttonContainer: {
    width: "92%",
  },
});
