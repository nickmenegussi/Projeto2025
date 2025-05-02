import React, { useContext, useEffect, useState } from "react"
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Link, router } from "expo-router"
import FormField from "../../components/FormField"
import Button from "../../components/Button"
import { ArrowLeftIcon } from "lucide-react-native"
import { SafeAreaView } from 'react-native'
import { AuthContext } from "../../context/auth"

export default function OtpSignIn() {
  const { OtpVerification, otpDigits } = useContext(AuthContext)
  const [otp, setOtp] = useState("")

  async function OtpVerify() {
    try {
      await OtpVerification(otp)
      router.push("/otpMessage")
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Erro", error.response.data.message)
        Alert.alert("Erro", error.response.data.message)
      } else {
        console.log("Erro", error)
        Alert.alert("Erro", "Erro ao verificar código")
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
              <Text style={[styles.text, styles.title]}>
                Verificação de Código
              </Text>
              <Text style={[styles.text, styles.subtitle]}>
                Insira o código de verificação que foi para a sua caixa de email
                para continuar!
              </Text>
              <View style={styles.FormContainer}>
                <FormField keyboardType='numeric' placeholder={"Digite o código aqui"} handleChangeText={(text) => setOtp(text)} value={otp}/>
              </View>
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
  )
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
    alignItems: "start",
    justifyContent: "start",
    marginTop: 20,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "start",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    minWidth: 360,
    maxWidth: 300,
  },
  colorButton: {
    backgroundColor: "white",
  },
  TextButton: {
    color: "black",
  },
  FormContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
