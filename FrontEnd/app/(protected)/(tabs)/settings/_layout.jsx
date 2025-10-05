import { Slot , Stack} from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="editProfile" options={{ headerShown: false}} />
      <Stack.Screen name="changePassword" options={{ headerShown: false}} />
      <Stack.Screen name="notification" options={{ headerShown: false}} />

    </Stack>
  )
}

export default RootLayout