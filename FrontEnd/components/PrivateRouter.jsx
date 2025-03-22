import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/auth";

export default function PrivateRouter({ children }) {
  const { user, otpDigits, otpEmail, loading } = useContext(AuthContext);
  const navigation = useNavigation();

  // Exibe um carregamento enquanto os dados de autenticação são processados
  if (loading) {
    return <ActivityIndicator size="large" color="#003B73" />;
  }

  // Se o usuário não está autenticado, redireciona para a tela inicial
  if (!user) {
    navigation.navigate("Home"); // Substitua "Home" pelo nome da sua tela inicial
    return null;
  }

  // Se o usuário precisa validar o email, redireciona para a verificação do email
  if (!otpEmail) {
    navigation.navigate("EmailOtp"); // Substitua "EmailOtp" pelo nome da tela de verificação de email
    return null;
  }

  // Se o usuário precisa confirmar o OTP, redireciona para a verificação OTP
  if (!otpDigits) {
    navigation.navigate("OtpVerification"); // Substitua "OtpVerification" pelo nome da tela de verificação do OTP
    return null;
  }

  // Se todas as verificações foram feitas, renderiza a página normalmente
  return <View>{children}</View>;
}
