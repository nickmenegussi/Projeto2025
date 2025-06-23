import React, { useContext, useEffect } from "react"
import { AuthContext } from "../context/auth"
import { router } from "expo-router"

export default function RedirectIfLoggedIn({ children }) {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading && !user) {
      router.replace('/(tabs)/home');
    }
  }, [user, loading]);

  if (loading) return null;

  return <>{children}</>;
}
