import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { ArrowLeftIcon } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/auth";

export default function ChangePassword() {
  const { updatePasswordForgotten } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  async function changePassword() {
    setLoading(true);
    try {
      await updatePasswordForgotten(
        formData.oldPassword,
        formData.newPassword,
        formData.confirmPassword
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível alterar a senha. Tente novamente.");
      console.log("Erro ao alterar senha:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={["#003B73", "#60A3D9"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        {/* Header Fixo */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeftIcon color="white" size={30} />
          </TouchableOpacity>
          <Text style={styles.title}>Alterar Senha</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.subtitle}>
              Para sua segurança, digite sua senha atual e a nova senha
              desejada.
            </Text>

            <FormField
              value={formData.oldPassword}
              othersStyles={{ width: "auto" }}
              title="Senha Atual"
              placeholder="Digite sua senha atual"
              type="Password"
              secureTextEntry
              handleChangeText={(text) =>
                setFormData({ ...formData, oldPassword: text })
              }
            />

            <FormField
              othersStyles={{ width: "auto" }}
              value={formData.newPassword}
              title="Nova Senha"
              type="Password"
              placeholder="Digite a nova senha"
              secureTextEntry
              handleChangeText={(text) =>
                setFormData({ ...formData, newPassword: text })
              }
            />

            <FormField
              value={formData.confirmPassword}
              othersStyles={{ width: "auto" }}
              title="Confirmar Nova Senha"
              type="Password"
              placeholder="Confirme a nova senha"
              secureTextEntry
              handleChangeText={(text) =>
                setFormData({ ...formData, confirmPassword: text })
              }
            />

            <View style={styles.buttonContainer}>
              <Button
                title={loading ? "Alterando..." : "Alterar Senha"}
                textStyles={styles.textButton}
                buttonStyle={styles.button}
                othersStyles={styles.buttonWrapper}
                handlePress={() => changePassword()}
                disabled={loading}
              />
            </View>

            <View style={styles.loginRedirect}>
              <Text style={styles.rememberText}>Lembrou sua senha?</Text>
              <TouchableOpacity onPress={() => router.push("/sign-in")}>
                <Text style={styles.loginLink}>Fazer Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30,
    textAlign: "left",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  buttonWrapper: {
    width: "100%",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 50,
  },
  textButton: {
    color: "#003B73",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    gap: 5,
  },
  rememberText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  loginLink: {
    color: "#BDE0FE",
    fontWeight: "600",
    fontSize: 14,
  },
});
