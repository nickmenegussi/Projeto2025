import React from 'react'
import { Slot , Stack} from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const RootLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
    </Stack>
  )
}

export default RootLayout