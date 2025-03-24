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

  if (!user) {
    navigation.navigate("/sign-in"); 
    return null;
  }
  if (!otpEmail) {
    navigation.navigate("EmailOtp"); 
    return null;
  }

  if (!otpDigits) {
    navigation.navigate("OtpVerification"); 
    return null;
  }

  return <View>{children}</View>;
}
