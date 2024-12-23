import React from 'react'
import { Slot , Stack} from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="profile" options={{ title: "Profile", headerBackTitle: "index"}} />

    </Stack>
  )
}

export default RootLayout