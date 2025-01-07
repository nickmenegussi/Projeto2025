import React from 'react'
import { Slot , Tabs} from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { House } from 'lucide-react';


// para mostrar o icone nas tabs, nós podemos criar um arrow function e passar a imagem

const TabIcon = ({icon, color, focused}) => {
  return (
    <View>
      <Image />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false, title: "Home", tabBarIcon: ( {color, focused}) => (
        <TabIcon icon={<House/>} />
      )}} />
      <Tabs.Screen name="library" options={{ headerShown: false, title: "Biblioteca"}} />
      <Tabs.Screen name="localization" options={{ headerShown: false, title: "Localização"}} />
      <Tabs.Screen name="studyGroup" options={{ headerShown: false, title: "Estudos"}} />
      <Tabs.Screen name="community" options={{headerShown: false, title: "Fórum"}} />
      <Tabs.Screen name="settings" options={{headerShown: false, title: "Configurações"}} />

    </Tabs>
    </>
  )
}

export default TabsLayout