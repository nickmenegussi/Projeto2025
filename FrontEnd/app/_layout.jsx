import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/auth";
import Toast from "react-native-toast-message";
import { NotificationProvider } from "../context/NotificationContext";
import * as Notifications from "expo-notifications";

// ⬇️ CONFIGURAÇÃO DAS NOTIFICAÇÕES - COLOCAR FORA DO COMPONENTE
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

const RootLayout = () => {
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
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast />
      </AuthProvider>
    </NotificationProvider>
  );
};

export default RootLayout;
