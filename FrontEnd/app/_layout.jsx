import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // ⬅️ ADICIONE ESTE IMPORT
import { AuthProvider } from "../context/auth";
import Toast from "react-native-toast-message";
import { NotificationProvider } from "../context/NotificationContext";
import * as Notifications from "expo-notifications";

// 1. MANTER A SPLASH NATIVA VISÍVEL IMEDIATAMENTE (ANTES DO COMPONENTE)
SplashScreen.preventAutoHideAsync();

// ⬇️ CONFIGURAÇÃO DAS NOTIFICAÇÕES (MANTENHA ESTA FORA DO COMPONENTE)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Simulação de carregamento inicial rápido (ex: 500ms)
                await new Promise(resolve => setTimeout(resolve, 500)); 
            } catch (e) {
                console.warn(e);
            } finally {
                // 2. Após o carregamento inicial, defina como pronto
                setAppIsReady(true);
                SplashScreen.hideAsync(); // 3. ESCONDE A SPLASH NATIVA!
            }
        }
        prepare();
    }, []);

    // 4. NÃO RENDERIZE NADA até que o appIsReady seja true
    if (!appIsReady) {
        return null;
    }


  return (
    <NotificationProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
            contentStyle: { backgroundColor: "#fff" },
          }}
        >
          <Stack.Screen
            name="(protected)"
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
          <Stack.Screen name="ApresentationScreen" options={{ animation: "none" }} />
          <Stack.Screen name="index" options={{ animation: "none" }} />

          <Stack.Screen name="sign-up" options={{ animation: "none" }} />
          <Stack.Screen name="sign-in" options={{ animation: "none" }} />
          <Stack.Screen name="emailOtp" options={{ animation: "none" }} />
          <Stack.Screen
            name="sign-otp-verification"
            options={{ animation: "none" }}
          />
          <Stack.Screen name="otpMessage" options={{ animation: "none" }} />
          <Stack.Screen name="ChangePassword" options={{ animation: "none" }} />
          <Stack.Screen name="otpPassword" options={{ animation: "none" }} />
          <Stack.Screen
            name="emailSendForgotPassword"
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="notification"
            options={{ animation: "none" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast />
      </AuthProvider>
    </NotificationProvider>
  );
};

export default RootLayout;
