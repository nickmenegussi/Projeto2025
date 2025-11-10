import React from "react";
import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="reserves" options={{ headerShown: false }} />
      <Stack.Screen name="LoanCollection" options={{ headerShown: false }} />
      <Stack.Screen name="ReserveCollection" options={{ headerShown: false }} />
      <Stack.Screen name="Cart" options={{ headerShown: false }} />
            <Stack.Screen name="reflections" options={{ headerShown: false }} />

      <Stack.Screen name="reflections/category/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="MessageLoanConfirmed"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="historicalShopping" options={{ headerShown: false }} />
      <Stack.Screen name="explore" options={{ headerShown: false }} />
      <Stack.Screen name="myLibrary" options={{ headerShown: false }} />
      <Stack.Screen
        name="ObrasComplementares"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="searchBook" options={{ headerShown: false }} />
      <Stack.Screen
        name="aboutBook/[LibraryId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="bookType/[LibraryId]"
        options={{ headerShown: false }}
      />

      <Stack.Screen name="ObrasBasicas" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
