import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import handleApiError from "../utils/handleApiError";
import Toast from "react-native-toast-message";

// export const useAuth = () => useContext(AuthContext)

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
        (await AsyncStorage.getItem("@Auth:user")) || "null"
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
    try {
      const response = await api.post("/auth/otp/create", {
        email,
      });

      setOtpEmail(response.data.data);
      Toast.show({
        type: "success",
        text1: `$${response.data.message}`,
        position: "top",
      });
      await AsyncStorage.setItem("@Auth:email", email);
      router.push("/sign-otp-verification");
    } catch (error) {
      setOtpEmail(null);
      handleApiError(error, true);
    }
  }
  async function OtpVerification(otp, email) {
    try {
      // const email = await AsyncStorage.getItem("@Auth:email");
      const response = await api.post("/auth/otp/verification", {
        email,
        otp,
      });

      await AsyncStorage.setItem("@Auth:email", "true");
      await AsyncStorage.setItem("@Auth:otp", "verificado!");
      setOtpDigits(true);
      router.push("/otpMessage");

      return response.data;
    } catch (error) {
      setOtpDigits(false);

      handleApiError(error, true);
    }
  }
  // criando uma função para o futuro login do usuário e a partir desse contexto gerando o token

  async function login(email, password) {
    const response = await api.post("/auth/login/create", { email, password });

    // Verifique se a resposta está no formato correto
    if (response.data.error) {
      setUser(null);
      console.log("Erro", response.data.error);
      Toast.show({
        type: "error",
        text1: `${response.data.error.message}`,
        position: "top",
      });
    }

    setUser(response.data.data.user);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.data.token}`;
    await AsyncStorage.setItem("@Auth:token", response.data.data.token);
    await AsyncStorage.setItem(
      "@Auth:user",
      JSON.stringify(response.data.data.user)
    );
    return response.data.data.message;
  }
  // update User
  async function register(nameUser, email, password) {
    try {
      const response = await api.post("/user/user/register", {
        nameUser,
        email,
        password,
      });

      if (response.data.error) {
        console.log("Erro", response.data.error);
        Toast.show({
          type: "error",
          text1: `${response.data.error.message}`,
          position: "top",
        });
      } else {
        Toast.show({
          type: "success",
          text1: `Cadastro realizado. Faça login.`,
          position: "top",
        });
        router.replace("/sign-up");
      }
    } catch (error) {
      handleApiError(error);
    }
  }
  async function updatePerfilImage(imageUri) {
    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const formData = new FormData();
      const timestamp = Date.now(); // cria um número único baseado no horário
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: `profile_${timestamp}.jpg`, // nome único
      });

      const response = await api.patch("/user/user/picture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const updatedUser = {
          ...user,
          image_profile: response.data.data.image_profile,
        };
        setUser(updatedUser);
        await AsyncStorage.setItem("@Auth:user", JSON.stringify(updatedUser));
        return updatedUser;
      }
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
      handleApiError(error);
    }
  }

  async function updatePasswordForgotWithNoLogin(newPassword, otp, email) {
    if (!newPassword || !otp || !email) {
      Toast.show({
        type: "error",
        text1: `Preencha todos os campos`,
        position: "top",
      });
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      const response = await OtpVerification(otp, email);
      if (!response.success === true) {
        console.error("erro ao verificar otp! tente novamente!");
      }

      const responseChangePassword = await api.patch(
        "/user/user/forgot-password",
        {
          email,
          newPassword,
          otp,
        }
      );

      if (responseChangePassword.status === 200) {
        Toast.show({
          type: "success",
          text1: "senha alterada.",
          position: "top",
        });
        await AsyncStorage.removeItem("@Auth:emailForgotenPassword");
        router.push("/sign-up");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${error.response.data.message}`,
        position: "top",
      });
    }
  }

  async function updatePasswordForgotten(
    currentPassword,
    newPassword,
    confirmedPassword
  ) {
    if (newPassword.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("@Auth:token");
      const response = await api.patch(
        "/user/user/password",
        { currentPassword, newPassword, confirmedPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        Alert.alert(
          "Sucesso!",
          "Senha atualizada com sucesso. Iremos redirecionar você para a página de login para iniciar a no aplicativo com os dados atualizados!."
        );
        setUser(null);
        setOtpDigits(null);
        setOtpEmail(null);
        AsyncStorage.clear();
        delete api.defaults.headers.common["Authorization"];
        router.replace("/sign-up");
      }
    } catch (error) {
      console.error("Erro no servidor ao atualizar senha:", error);
      handleApiError(error);
    }
  }

  async function handleUpdateNameUser(newNameUser) {
    if (!newNameUser) return;

    try {
      const token = await AsyncStorage.getItem("@Auth:token");

      const response = await api.patch(
        "/user/user/nameUser",
        { nameUser: newNameUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        Alert.alert("Sucesso!", "Nome do usuário mudado com sucesso.");
        setUser((prev) => ({ ...prev, nameUser: newNameUser }));
      }
    } catch (error) {
      console.error("Erro no servidor ao atualizar nome de usuário:", error);
      handleApiError(error);
    }
  }

  function logout() {
    setUser(null);
    setOtpDigits(null);
    setOtpEmail(null);
    AsyncStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    router.replace("/sign-up");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        otpDigits,
        otpEmail,
        logout,
        loading,
        OtpSendEmail,
        OtpVerification,
        register,
        updatePerfilImage,
        updatePasswordForgotten,
        updatePasswordForgotWithNoLogin,
        handleUpdateNameUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
