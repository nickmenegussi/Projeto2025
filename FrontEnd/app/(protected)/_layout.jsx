import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";


export default function ProtectedLayout() {
  const {user, loading} = useContext(AuthContext);

  if(loading) return null

  if (!user) {
    return <Redirect href="/sign-up" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}