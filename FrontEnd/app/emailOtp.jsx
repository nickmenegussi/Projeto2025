import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
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
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EmailOtp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { OtpSendEmail } = useContext(AuthContext);

  async function OtpEntrar() {
    setLoading(true);
    if (loading) {
      Alert.alert("Carregando", "Aguarde um momento...");
    }
    try {
      await OtpSendEmail(email);

      router.push("/sign-otp-verification");

      Alert.alert("Sucesso!", "Email enviado com sucesso!");
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Erro", error.response.data.message);
        Alert.alert("Erro:", error.response.data.message);
      } else {
        console.log("Erro", error);
        Alert.alert("Erro", "Erro ao enviar email");
      }
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
            onPress={() => router.push("/sign-up")}
            style={styles.returntoPage}
          >
            <ArrowLeftIcon color="white" size={30} />
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Digite seu Email</Text>
              <Text style={[styles.text, styles.subtitle]}>
                Digite seu email para receber o código de verificação
              </Text>
            </View>
            <FormField
              titulo="Email"
              placeholder="Digite seu email"
              handleChangeText={(text) => setEmail(text)}
              value={email}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Enviar Código"
                textStyles={styles.TextButton}
                buttonStyle={styles.colorButton}
                othersStyles={styles.Button}
                handlePress={OtpEntrar}
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
  buttonContainer: {
    width: "92%",
  },
  text: {
    color: "#FFFFFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 300,
  },
  colorButton: {
    backgroundColor: "white",
  },
  TextButton: {
    color: "black",
  },
});
