import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
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
import { ArrowLeftIcon, X } from "lucide-react-native";
import { SafeAreaView } from "react-native";
import { AuthContext } from "../context/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OtpSignIn() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { OtpVerification, OtpSendEmail } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("")
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const email = await AsyncStorage.getItem("@Auth:email");

        if (email) {
          setOtpEmail(email);
        }
      } catch (error) {
        console.log("Erro ao buscar email:", error);
      }
    }
    loadData();
  }, []);

  const [snack, setSnack] = useState({
    visible: false,
    message: "",
    type: "info",
    onDismiss: null,
  });

  const showSnack = (message, type = "info", onDismissCanceled) => {
    setSnack({ visible: true, message, type, onDismiss: onDismissCanceled });
  };

  async function OtpVerify() {
    try {
      const response = await OtpVerification(otp);
      showSnack(response, "success", () => {
        router.push("/otpMessage");
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Erro", error.response.data.message);
        showSnack(error.response.data.message, "error", null);
      } else {
        console.log("Erro", error);
        showSnack(error, "error", null);
      }
    }
  }

  const renderWeb = () => {
    return (
      <View style={styles.WebContainer}>
        <View style={styles.WebForm}>
          <TouchableOpacity
            onPress={() => router.push("/emailOtp")}
            style={styles.returntoPage}
          >
            <ArrowLeftIcon color="#003B73" size={30} />
            <Text style={{ color: "#003B73", fontSize: 16 }}>Voltar</Text>
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
          </View>
          <Text style={styles.Webtitle}>Verificação de Código</Text>
          <Text style={styles.Websubtitle}>
            Insira o código de verificação que foi para a sua caixa de email
            para continuar!
          </Text>

          <FormField
            inputMode="numeric"
            placeholder={"Digite o código aqui"}
            handleChangeText={(text) => {
              setOtp(text);
            }}
            value={otp}
            pattern={"[0-9]*"}
            title={"Código"}
          />
          <View style={styles.WebButtonContainer}>
            <Button
              title="Enviar Código"
              textStyles={{ color: "white" }}
              buttonStyle={{ backgroundColor: "#003B73" }}
              othersStyles={styles.Button}
              handlePress={OtpVerify}
            />
          </View>
          <View style={styles.sendAgainContainer}>
            <Text style={styles.sendEmailAgain}>Não recebeu o código?</Text>
            <TouchableOpacity
              onPress={() => {
                OtpSendEmail(otpEmail);
              }}
            >
              <Text style={styles.sendAgainLink}>Reenviar Código</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.WebBanner}>
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
              onPress={() => router.push("/emailOtp")}
              style={styles.returntoPage}
            >
              <ArrowLeftIcon color="white" size={30} />
            </TouchableOpacity>
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Verificação de Código</Text>
                <Text style={[styles.text, styles.subtitle]}>
                  Insira o código de verificação que foi para a sua caixa de
                  email para continuar!
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
  };

  return (
    <View style={{ flex: 1 }}>
      {isMobile ? renderMobile() : renderWeb()}
      <Snackbar
        visible={snack.visible}
        onDismiss={() => {
          // tive que adicionar essa verificação pois quando o onDismiss era null barrava aqui
          if (
            snack.onDismiss !== null &&
            typeof snack.onDismiss === "function"
          ) {
            snack.onDismiss();
          }
          setSnack((e) => ({ ...e, onDismiss: null, visible: false }));
        }}
        duration={2000}
        style={{
          position: "absolute",
          bottom: 30, // sempre visível no rodapé
          alignSelf: "center",
          minWidth: "80%",
          borderRadius: 12,
          paddingHorizontal: 16,
          elevation: 4, // sombra Android
          shadowColor: "#000", // sombra iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          backgroundColor:
            snack.type === "success"
              ? "#16a34a" // verde
              : snack.type === "error"
              ? "#dc2626" // vermelho
              : "#334155", // cinza (info)
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 17 }}>{snack.message}</Text>
          <TouchableOpacity
            onPress={() =>
              setSnack((prev) => ({
                ...prev,
                visible: false,
                onDismiss: snack.onDismiss(),
              }))
            }
          >
            <X size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  returntoPage: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
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
  WebContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100vh",
  },
  WebBanner: {
    flex: 1.5,
    padding: 40,
    minWidth: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
  WebForm: {
    flex: 1,
    padding: 40,
    maxWidth: 530,
    justifyContent: "center",
  },
  Webtitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003b73",
    marginBottom: 10,
  },
  Websubtitle: {
    fontSize: 18,
    color: "#003b73",
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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
  WebButtonContainer: {
    width: "100%",
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
});
