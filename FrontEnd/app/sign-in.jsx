import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { AuthContext } from "../context/auth";
import handleApiError from "../utils/handleApiError";

export default function SignIn() {
  const {register} = useContext(AuthContext)
  const [form, setform] = useState({
    nameUser: "",
    email: "",
    password: "",
  })

  async function Register(){
    try {
      await register(form.nameUser, form.email, form.password)
    } catch (error) {
      handleApiError(error)
    }
  }

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
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled"> 
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={[styles.text, styles.title]}>Cadsatre-se</Text>
            <Text style={[styles.text, styles.subtitle]}>
              Crie a sua conta ou faça seu login para explorar nosso app!
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => router.push(`/sign-up`)}
                activeOpacity={0.7}
                style={styles.button}
              >
                <Text style={{ color: "#7D7D91" }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push(`/sign-in`)}
                style={[styles.button, , styles.buttonActive]}
              >
                <Text style={styles.linkText}>Cadastro</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FormField
            othersStyles={styles.formShort} // Passando o estilo adicional para o campo de senha
            title="Nome"
            value={form.nameUser}
            placeholder="Digite seu nome de usuário"
            handleChangeText={(e) => setform({ ...form, nameUser: e })}
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Digite seu email"
            handleChangeText={(e) => setform({ ...form, email: e })}
          />

          <FormField
            title="Senha"
            type="Password"
            value={form.password}
            placeholder="Digite sua senha"
            handleChangeText={(e) => setform({ ...form, password: e })}
          />

          <View style={styles.buttonWrapper}>
            <Button title="Cadastrar"  handlePress={Register}/>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
    width: "100%",
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
    paddingHorizontal: 10, // Mesmo padding do botão
    marginTop: 10,
  },
});
