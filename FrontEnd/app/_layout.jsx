import React from 'react'
import { Slot , Stack} from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from '../context/auth';
import  PrivateRouter  from '../components/PrivateRouter';

const RootLayout = () => {
  return (

    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(auth)" options={{ headerShown: false}} />
    </Stack>

  )

}

export default RootLayout