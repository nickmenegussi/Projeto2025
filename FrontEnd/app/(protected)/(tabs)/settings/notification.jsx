import { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Button, 
  Alert, 
  Platform, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  StyleSheet 
} from "react-native";
import { useNotification } from "../../../../context/NotificationContext";
import * as Updates from "expo-updates";

export default function HomeScreen() {
  const { notification, expoPushToken, error } = useNotification();
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  const [dummyState, setDummyState] = useState(0);

  // 🔥 FUNÇÃO PARA ENVIAR NOTIFICAÇÃO DE TESTE
  const sendTestNotification = async () => {
    if (!expoPushToken) {
      Alert.alert("Erro", "Token push não disponível ainda");
      return;
    }

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: expoPushToken,
          title: "Teste do CEO App! 🎉",
          body: "Esta é uma notificação de teste do seu app!",
          data: { screen: "Home", test: "123" },
          sound: "default"
        }),
      });

      const result = await response.json();
      
      if (result.data?.status === 'ok') {
        Alert.alert("Sucesso!", "Notificação enviada! Verifique seu celular.");
      } else {
        Alert.alert("Erro", "Falha ao enviar notificação");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar a notificação");
      console.error(error);
    }
  };

  // 🔥 FUNÇÃO PARA COPIAR O TOKEN
  const copyToken = () => {
    if (expoPushToken) {
      // Em React Native, usamos Alert para mostrar o token
      Alert.alert(
        "Seu Token Push", 
        expoPushToken,
        [
          { text: "OK" },
          { text: "Copiar", onPress: () => console.log("Token:", expoPushToken) }
        ]
      );
    }
  };

  useEffect(() => {
    if (isUpdatePending) {
      dummyFunction();
    }
  }, [isUpdatePending]);

  const dummyFunction = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      Alert.alert("Error");
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        
        <Text style={styles.title}>CEO App</Text>
        
        <Text style={styles.subtitle}>Sistema de Atualizações</Text>
        <Text>
          {currentlyRunning.isEmbeddedLaunch
            ? "App rodando código built-in"
            : "App rodando uma atualização"}
        </Text>
        
        <Button
          onPress={() => Updates.checkForUpdateAsync()}
          title="Verificar atualizações"
        />
        
        {isUpdateAvailable && (
          <Button
            onPress={() => Updates.fetchUpdateAsync()}
            title="Baixar e instalar atualização"
          />
        )}

        {/* 🔥 SEÇÃO DE NOTIFICAÇÕES PUSH */}
        <View style={styles.notificationSection}>
          <Text style={styles.sectionTitle}>🔔 Teste de Notificações Push</Text>
          
          <Text style={styles.label}>Seu Push Token:</Text>
          <Text style={styles.tokenText} onPress={copyToken}>
            {expoPushToken || "Carregando token..."}
          </Text>

          {/* BOTÃO PARA ENVIAR NOTIFICAÇÃO DE TESTE */}
          <View style={styles.buttonContainer}>
            <Button 
              title="📱 Enviar Notificação de Teste" 
              onPress={sendTestNotification}
              disabled={!expoPushToken}
              color="#007AFF"
            />
          </View>

          <Text style={styles.label}>Última Notificação Recebida:</Text>
          <Text>Título: {notification?.request.content.title || "Nenhuma"}</Text>
          <Text>Corpo: {notification?.request.content.body || "Nenhuma"}</Text>
          <Text style={styles.dataText}>
            Dados: {JSON.stringify(notification?.request.content.data, null, 2) || "{}"}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  notificationSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#007AFF",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  tokenText: {
    fontSize: 12,
    backgroundColor: '#f1f3f4',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  dataText: {
    fontSize: 10,
    backgroundColor: '#f1f3f4',
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  buttonContainer: {
    marginVertical: 12,
  },
});