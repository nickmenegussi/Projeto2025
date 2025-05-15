import React, { useContext, useEffect } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../context/auth"
import { router } from "expo-router"
import LoadingScreen from "./AcitivityIndicator"

export default function PrivateRouter({ children }) {
  const { user, otpDigits, otpEmail, loading } = useContext(AuthContext)

  useEffect(() => {
    if (!loading) { // só verifica quando o loading terminar
      if (!user) {
        router.replace("/sign-in")
      } else if (!otpEmail) {
        router.replace("/emailOtp")
      } else if (!otpDigits) {
        router.replace("/OtpVerification")
      } else {
        router.replace("/(tabs)/home")
      }
    }
  }, [user, otpDigits, otpEmail, loading])

  if(loading){
    console.log(loading)
    return <LoadingScreen />
  }
  
  return <>{children}</>
}
