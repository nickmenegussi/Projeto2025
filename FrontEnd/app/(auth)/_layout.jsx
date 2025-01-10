import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='sing-up' options={{headerShown: false}} />
    </Stack>
  )
}

export default RootLayout