import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthContext = createContext();

// trocar AsyncStorage pelo AsyncStorage

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [otpEmail, setOtpEmail] = useState(null);
  const [otpDigits, setOtpDigits] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // verificar se já existe um login
  // em react-native, é necessário ter para o uso de AsyncStorage uma funcao async await
  useEffect(() => {
    const loadData = async () => {
      const dadosToken = await AsyncStorage.getItem("@Auth:token");
      const dadosUser = JSON.parse(
    (await AsyncStorage.getItem("@Auth:user")) || "[]"
      );
      const dadosOtp = (await AsyncStorage.getItem("@Auth:otp")) || "";
      const dadosEmail = (await AsyncStorage.getItem("@Auth:email")) || "";

      if (dadosToken && dadosUser) {
        setUser(dadosUser);
        api.defaults.headers.common["Authorization"] = `Bearer ${dadosToken}`;
      }

      if (dadosOtp === "verificado!") {
        setOtpDigits(dadosOtp);
      }
      if (dadosEmail === "verificado!") {
        setOtpEmail(dadosEmail);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  async function OtpSendEmail(email) {
    const response = await api.post("/auth/otp/create", {
      email,
    });
    if (response.data.error) {
              setOtpEmail(null);

      console.log("Erro", response.data.error);
      Alert.alert(`Erro ${error.response.data.message}`);
    } else {
      setOtpEmail(response.data.data);
      Alert.alert("Sucesso!", response.data.message);
      await AsyncStorage.setItem("@Auth:email", email);
    }
  }
  async function OtpVerification(otp) {
    const email = await AsyncStorage.getItem("@Auth:email");
    const response = await api.post("/auth/otp/verification", {
      email,
      otp,
    });
    if (response.data.error) {
      setOtpDigits(false);

      console.log("Erro", response.data.error);
      Alert.alert(`Erro ${error.response.data.message}`);
    } else {
      Alert.alert("Sucesso!", response.data.message);
      await AsyncStorage.setItem("@Auth:email", "true");
      await AsyncStorage.setItem("@Auth:otp", "verificado!");
      setOtpDigits(true);
    }
  }
  // criando uma função para o futuro login do usuário e a partir desse contexto gerando o token

  async function login(email, password) {
    const response = await api.post("/auth/login/create", { email, password });

    // Verifique se a resposta está no formato correto
    if (response.data.error) {
      setUser(null);
      console.log("Erro", response.data.error);
      Alert.alert("Erro", response.data.error.message);
    } else {
      setUser(response.data.data.user);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.token}`;
      await AsyncStorage.setItem("@Auth:token", response.data.data.token);
      await AsyncStorage.setItem(
        "@Auth:user",
        JSON.stringify(response.data.data.user)
      );
    }
  }
  // update User

  function logout() {
    setUser(null);
    AsyncStorage.clear();
    delete api.defaults.headers.common["Authorization"];

    router.push("/sign-up"); // troquei o Redirect do expo router, pois, o expo-router funciona somente para estruturas de pastas definidas e quando não está nao funciona
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        otpDigits,
        otpEmail,
        logout,
        loading,
        OtpSendEmail,
        OtpVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
