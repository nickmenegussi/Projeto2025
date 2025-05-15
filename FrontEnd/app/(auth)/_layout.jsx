import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../../context/auth";
import PrivateRouter from "../../components/PrivateRouter";

const RootLayout = () => {
  return (
    // <PrivateRouter>
      <Stack>
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen
          name="forgottenPassword"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="emailOtp" options={{ headerShown: false }} />
        <Stack.Screen name="otpMessage" options={{ headerShown: false }} />
        <Stack.Screen
          name="sign-otp-verification"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="otpPassword" options={{ headerShown: false }} />
        <Stack.Screen name="newPassword" options={{ headerShown: false }} />
        <Stack.Screen name="MessagePassword" options={{ headerShown: false }} />
      </Stack>
    // {/* </PrivateRouter> */}
  );
};

export default RootLayout;
