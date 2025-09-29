import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/auth";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
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
      </Stack>
      <Toast />
    </AuthProvider>
  );
};

export default RootLayout;
