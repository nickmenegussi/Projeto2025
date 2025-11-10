import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useNavigation } from "expo-router";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from "react-native-paper";
import { X } from "lucide-react-native";
import Toast from "react-native-toast-message";
import handleApiError from "../utils/handleApiError";

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Move this inside the component
  const { login, setUser, loading, setLoading } = useContext(AuthContext);
  const [loginUser, setLogin] = useState({
    email: "",
    password: "",
  });

  async function Login() {
    try {
      await login(loginUser.email, loginUser.password);
      Toast.show({
        type: "success",
        text1: "Login realizado!",
        position: "top",
        
      });
      router.replace("/emailOtp")
    } catch (error) {
      handleApiError(error, true)
    }
  }

  const renderWeb = () => {
    return (
      <View style={{ flex: 1, flexDirection: "row", height: "100vh" }}>
        <View style={styles.webForm}>
          <View style={styles.logoContainer}>
            <Text style={styles.webTitle}>Bem-vindo de volta, carlos!</Text>
          </View>
          <Text style={styles.webSubtitle}>Faça login para continuar</Text>

          <FormField
            title="Email"
            value={loginUser.email}
            placeholder="Digite seu email"
            handleChangeText={(text) => setLogin({ ...loginUser, email: text })}
          />

          <FormField
            title="Senha"
            type="Password"
            value={loginUser.password}
            placeholder="Digite sua senha"
            secureTextEntry
            handleChangeText={(text) =>
              setLogin({ ...loginUser, password: text })
            }
          />

          <TouchableOpacity
            style={styles.forgotLink}
            onPress={() => router.push("/forgottenPassword")}
          >
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <View style={styles.webButtonWrapper}>
            <Button title="Entrar" handlePress={Login} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.push(`/sign-in`)}>
              <Text style={styles.signupLink}>Cadastre-se</Text>
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
                borderRadius: 75, // Metade da largura/altura para círculo perfeito
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.3)",
              }}
            />
            <Text style={styles.bannerTitle}>Centro Espírita Online</Text>
            <Text style={styles.bannerSubtitle}>
              Conectando pessoas através da doutrina espírita
            </Text>
            <View style={styles.bannerFeatures}>
              <View style={styles.featureItem}>
                <Icon name="users" size={20} color="#FFFFFF" />
                <Text style={styles.featureText}>Comunidade</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="book" size={20} color="#FFFFFF" />
                <Text style={styles.featureText}>Estudos</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="heart" size={20} color="#FFFFFF" />
                <Text style={styles.featureText}>Apoio</Text>
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={[styles.text, styles.title]}>Iniciar Login</Text>
                <Text style={[styles.text, styles.subtitle]}>
                  Crie a sua conta ou faça seu login para explorar nosso app!
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => router.push(`/sign-up`)}
                    activeOpacity={0.7}
                    style={[styles.button, styles.buttonActive]}
                  >
                    <Text style={styles.linkText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push(`/sign-in`)}
                    style={styles.button}
                  >
                    <Text style={{ color: "#7D7D91" }}>Cadastro</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push(`/notification`)}
                    style={styles.button}
                  >
                    <Text style={{ color: "#7D7D91" }}>enviar notificacao</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <FormField
                title="Email"
                value={loginUser.email}
                placeholder="Digite um email"
                handleChangeText={(text) =>
                  setLogin({ ...loginUser, email: text })
                }
              />

              <FormField
                title="Senha"
                type="Password"
                value={loginUser.password}
                placeholder="Digite uma senha"
                handleChangeText={(text) =>
                  setLogin({ ...loginUser, password: text })
                }
              />

              <View style={styles.forgottenPasswordContainer}>
                <TouchableOpacity
                  onPress={() => router.push("/emailSendForgotPassword")}
                  activeOpacity={0.5}
                >
                  <Text style={styles.forgottenPassword}>
                    Esqueceu sua senha?
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonWrapper}>
                <Button title="Entrar" handlePress={Login} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  };

  return (
    <View style={{ flex: 1 }}>{isMobile ? renderMobile() : renderWeb()}</View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  forgottenPasswordContainer: {
    marginTop: 10,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  forgottenPassword: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 300,
  },
  buttonContainer: {
    backgroundColor: "#E2E8F0",
    flexDirection: "row",
    width: "93%",
    padding: 2,
    marginTop: 15,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "#FFFFFF",
  },
  linkText: {
    textAlign: "center",
    color: "#003B73",
  },
  buttonWrapper: {
    width: "97%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  webForm: {
    flex: 1,
    padding: 40,
    maxWidth: 530,
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logoIcon: {
    marginRight: 10,
  },
  webTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003B73",
  },
  webSubtitle: {
    fontSize: 18,
    color: "#60A3D9",
    textAlign: "center",
    marginBottom: 30,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 20,
  },
  forgotText: {
    color: "#60A3D9",
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#555",
    marginRight: 5,
  },
  signupLink: {
    color: "#003B73",
    fontWeight: "bold",
  },
  webBanner: {
    flex: 1.5,
    backgroundColor: "rgba(0, 59, 115, 0.8)", // Azul com transparência (#003B73 com 70% de opacidade)
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(12px)", // compatibilidade
    padding: 40,
  },
  bannerContent: {
    alignItems: "center",
    maxWidth: 500,
    position: "relative",
  },
  bannerIcon: {
    marginBottom: 20,
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
