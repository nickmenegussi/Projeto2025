import React from "react";
import { Slot, Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  withSpring 
} from "react-native-reanimated";
import {
  LibraryIcon,
  GraduationCapIcon,
  House,
  MapIcon,
  MessagesSquare,
  SettingsIcon,
} from "lucide-react-native";

// Componente de Ícone Animado - APENAS EFEITO DE ESCALA
const AnimatedTabIcon = ({ color, focused, IconComponent }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { 
        scale: withSpring(focused ? 1.2 : 1, {
          damping: 8,
          stiffness: 150
        }) 
      }
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <IconComponent color={color} size={focused ? 28 : 26} />
    </Animated.View>
  );
};

const TabsLayout = () => {
  const isWeb = Platform.OS === 'web';
  
  if (isWeb) {
    return (
      <View style={styles.webContainer}>
        <Slot />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: "#60A3D9",
        tabBarInactiveTintColor: "#003B73",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          height: 75,
          paddingBottom: 8,
          // 🔥 CENTRALIZAÇÃO: Remove margens e centraliza conteúdo
          marginHorizontal: 0,
          paddingHorizontal: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Georgia",
          // 🔥 Centraliza texto
          textAlign: 'center',
          width: '100%',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 0,
          paddingVertical: 5,
          marginHorizontal: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          lazy: true,
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon 
              color={color} 
              focused={focused} 
              IconComponent={House}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          lazy: true,
          headerShown: false,
          title: "Biblioteca",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon 
              color={color} 
              focused={focused} 
              IconComponent={LibraryIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="localization"
        options={{
          headerShown: false,
          title: "Casas",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon 
              color={color} 
              focused={focused} 
              IconComponent={MapIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="studyGroup"
        options={{
          headerShown: false,
          title: "Estudos",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon 
              color={color} 
              focused={focused} 
              IconComponent={GraduationCapIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          headerShown: false,
          title: "Fórum",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon 
              color={color} 
              focused={focused} 
              IconComponent={MessagesSquare}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon 
              color={color} 
              focused={focused} 
              IconComponent={SettingsIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default TabsLayout;