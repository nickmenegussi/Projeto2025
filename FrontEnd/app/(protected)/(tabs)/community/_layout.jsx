import React from 'react'
import { Slot , Stack} from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="createPost" options={{ headerShown: false}} />
      <Stack.Screen name="post/[postId]" options={{ headerShown: false}} />
      <Stack.Screen name="topic" options={{ headerShown: false}} />
      <Stack.Screen name="createTopic" options={{ headerShown: false}} />
      <Stack.Screen name="searchTopics" options={{ headerShown: false}} />

    </Stack>
  )
}

export default RootLayout