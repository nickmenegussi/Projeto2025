import React from "react";
import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AuthProvider } from "../../../context/auth";
import PrivateRouter from "../../../components/PrivateRouter";

const RootLayout = () => {
  return (
    // <PrivateRouter>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="lectures" options={{ headerShown: false }} />
        <Stack.Screen name="aboutLecture" options={{ headerShown: false }} />
        <Stack.Screen name="speaker" options={{ headerShown: false }} />
        <Stack.Screen
          name="lecturesObjective"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="targetPublicLectures"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ReviewSociety" options={{ headerShown: false }} />
        <Stack.Screen name="volunteerWork" options={{ headerShown: false }} />
        <Stack.Screen name="faq" options={{ headerShown: false }} />
      </Stack>
    // </PrivateRouter>
  );
};

export default RootLayout;
