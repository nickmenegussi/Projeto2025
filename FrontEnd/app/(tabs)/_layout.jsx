import React, { lazy } from 'react'
import { Slot , Tabs} from 'expo-router';
import { Image, Settings, StyleSheet, Text, View } from 'react-native';
import { LibraryIcon, GraduationCapIcon, House, MapIcon, MessagesSquare, SettingsIcon, Settings2 } from 'lucide-react-native';


const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{ lazy: true, tabBarActiveTintColor: '#60A3D9', tabBarInactiveTintColor: '#003B73' ,tabBarStyle: {
        backgroundColor: '#ffff',
        borderTopWidth: 0,
        borderTopColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
      }, tabBarLabelStyle: {
         fontSize: 13,
         fontFamily: 'Georgia',
      }, 
      tabBarItemStyle: {
        marginTop: 14
      }
      }} >
        <Tabs.Screen name="home"  options={{lazy: true, headerShown: false, title: 'Home' ,tabBarIcon: ({color, size, focused}) => (
            <House color={color} size={30} focused={focused} name="Home" />)}} 
        />
        <Tabs.Screen name="library" options={{lazy: true, headerShown: false, title: "Biblioteca", tabBarIcon: ({color, size, focused}) => (
          <LibraryIcon color={color} size={30}  focused={focused} />
          )}} />

        <Tabs.Screen name="localization" options={{ headerShown: false, title: "Casas", tabBarIcon: ({color, size, focused}) => (
          <MapIcon color={color} size={30} focused={focused} />
        ) }} />
        <Tabs.Screen name="studyGroup" options={{ headerShown: false, title: "Estudos", tabBarIcon: ({color, size, focused}) => (
          <GraduationCapIcon color={color} size={30} focused={focused} />
        )}} />
        <Tabs.Screen name="community" options={{headerShown: false, title: "Fórum", tabBarIcon: ({color, size, focused}) => (
          <MessagesSquare  color={color} size={30} focused={focused} />
        )}} />
        <Tabs.Screen name="settings" options={{headerShown: false, title: "Perfil", tabBarIcon: ({color, size, focused}) => (
          <SettingsIcon color={color} size={30} focused={focused} />
        )}} />
    </Tabs>
    </>
  )
}
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center'  
  },  
});  
export default TabsLayout