import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/auth';
import PrivateRouter from '../components/PrivateRouter';

const RootLayout = () => {
  return (
    <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
