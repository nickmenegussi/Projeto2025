import React, { useContext, useEffect, useState } from "react"
import {
  Alert,
  Image,
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
import { SafeAreaView } from "react-native-safe-area-context"
import { AuthContext } from "../../context/auth"

export default function OtpMessage() {
  return (
    <LinearGradient
      colors={["#003B73", "#60A3D9"]}
      end={{ x: 0, y: 1 }}
      locations={[0, 4]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.scrollContainer} >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image  source={require("../../assets/images/Successmark.png")}/>
            <View style={styles.headerContainer}>
              <Text style={[styles.text, styles.title]}>Autenticação Válida</Text>
              <Text style={[styles.text, styles.subtitle]}>
                Parabéns! A sua autenticação foi realizada com sucesso, agoora voce pode acessar a plataforma.
              </Text>
              <Button  title="Entrar"
                        textStyles={styles.TextButton}
                        buttonStyle={styles.colorButton}
                        othersStyles={styles.Button}
                        handlePress={() => {
                          router.push("/home")
                        }}
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
  scrollContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%", 
    marginTop: 240
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
    minWidth: 360,
    maxWidth: 300,
    textAlign: 'center'
  }
})
