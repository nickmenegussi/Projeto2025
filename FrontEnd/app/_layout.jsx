import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/auth';
import { PaperProvider } from "react-native-paper";

const RootLayout = () => {
  return (
    <AuthProvider>
      <PaperProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="sign-in"
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="emailOtp"
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="sign-otp-verification"
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="otpMessage"
          options={{ animation: "none" }}
        />

      </Stack>
      </PaperProvider>
    </AuthProvider>
  );
};

export default RootLayout;
