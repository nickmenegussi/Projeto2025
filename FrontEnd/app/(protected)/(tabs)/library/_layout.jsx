import React from "react";
import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="reserves" options={{ headerShown: false }} />
      <Stack.Screen name="LoanCollection" options={{ headerShown: false }} />
      <Stack.Screen name="aboutBook" options={{ headerShown: false }} />
      <Stack.Screen name="bookLoan" options={{ headerShown: false }} />
      <Stack.Screen name="CartLoan" options={{ headerShown: false }} />
      <Stack.Screen
        name="MessageLoanConfirmed"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="historicalLoans" options={{ headerShown: false }} />
      <Stack.Screen name="explore" options={{ headerShown: false }} />
      <Stack.Screen name="myLibrary" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
