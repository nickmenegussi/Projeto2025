import React from 'react'
import { Slot , Stack} from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="lectures" options={{ headerShown: false}} />
      <Stack.Screen name="aboutLecture" options={{ headerShown: false}} />

    </Stack>
  )
}

export default RootLayout