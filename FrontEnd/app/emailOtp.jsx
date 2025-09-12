import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { ArrowLeftIcon } from "lucide-react-native";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default function EmailOtp() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
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

  const renderWeb = () => {
    return (
      <View style={{ flex: 1, flexDirection: "row", height: "100vh" }}>
        <View style={styles.webForm}>
          <TouchableOpacity
            onPress={() => router.push("/sign-up")}
            style={styles.returntoPage}
          >
            <ArrowLeftIcon color="#003B73" size={30} />
            <Text style={styles.webReturnText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/icon.png")}
              style={{
                width: 150,
                height: 150,
                marginBottom: 20,
                borderRadius: 75,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.3)",
              }}
            />
            <Text style={styles.webTitle}>Verificação de Email</Text>
          </View>

          <Text style={styles.webSubtitle}>
            Digite seu email para receber o código de verificação
          </Text>

          <FormField
            title="Email"
            placeholder="seu@email.com"
            handleChangeText={(text) => setEmail(text)}
            value={email}
          />

          <View style={styles.webButtonWrapper}>
            <Button
              title="Enviar Código"
              buttonStyle={{ backgroundColor: "#003b73" }}
              handlePress={OtpEntrar}
            />
          </View>

          <View style={styles.sendAgainContainer}>
            <Text style={styles.sendEmailAgain}>Não recebeu o código?</Text>
            <TouchableOpacity>
              <Text style={styles.sendAgainLink}>Reenviar Código</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.webBanner}>
          <View style={styles.bannerContent}>
            <Image
              source={require("../assets/images/icon.png")}
              style={{
                width: 150,
                height: 150,
                marginBottom: 20,
                borderRadius: 75,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.3)",
              }}
            />
            <Text style={styles.bannerTitle}>Verificação de Segurança</Text>
            <Text style={styles.bannerSubtitle}>
              Proteja sua conta com verificação em duas etapas
            </Text>
            <View style={styles.bannerFeatures}>
              <View style={styles.featureItem}>
                <Icon name="shield" size={20} color="#FFFFFF" />
                <Text style={styles.featureText}>Segurança reforçada</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="users" size={20} color="#FFFFFF" />
                <Text style={styles.featureText}>
                  Código válido por 10 minutos
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Icon name="heart" size={20} color="#FFFFFF" />
                <Text style={styles.featureText}>Entrega instantânea</Text>
              </View>
            </View>
          </View>

          <View style={styles.bannerFooter}>
            <Text style={styles.footerText}>
              @ copyright 2025 by Nicolas Menegussi
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderMobile = () => {
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
  };

  return isMobile ? renderMobile() : renderWeb();
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  returntoPage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  webReturnText: {
    color: "#003B73",
    fontSize: 16,
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
    alignItems: "flex-start",
    marginTop: 20,
    gap: 6,
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
  webForm: {
    flex: 1,
    padding: 40,
    maxWidth: 530,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  webTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003b73",
    textAlign: "center",
    marginBottom: 10,
  },
  webSubtitle: {
    fontSize: 18,
    color: "#003b73",
    textAlign: "center",
    marginBottom: 30,
  },
  sendAgainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 5,
  },
  sendEmailAgain: {
    color: "#555",
  },
  sendAgainLink: {
    color: "#003B73",
    fontWeight: "bold",
  },
  webBanner: {
    flex: 1.5,
    backgroundColor: "#003B73",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: 40,
  },
  bannerContent: {
    alignItems: "center",
    maxWidth: 500,
    position: "relative",
  },
  bannerTitle: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  bannerSubtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 30,
  },
  bannerFeatures: {
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
  },
  featureText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  bannerFooter: {
    position: "absolute",
    bottom: 30,
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  webButtonWrapper: {
    marginTop: 10,
  },
});
