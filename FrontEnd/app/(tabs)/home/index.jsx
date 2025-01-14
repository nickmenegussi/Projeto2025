import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Bell, CircleUserRoundIcon, Menu, MenuIcon} from 'lucide-react-native'
import ButtonIcons from '../../../components/ButtonIcons'

const forgottenPassword = () => {

  return (
    
    <LinearGradient 
      colors={['#003B73', '#60A3D9']} 
      end={{ x: 0, y: 1 }} 
      locations={[0, 4]} 
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
           <View>
            <View style={styles.containerIcons}>
              {/* Eu defino no meu componente as cores e o tamanho dele, depois, eu coloco desistruturo o meu arrow function em uma função que irá receber um obejeto com algumas características que depois irei passar no Icon*/}
              <ButtonIcons color={"white"} size={30} Icon={({color, size}) => (
                <MenuIcon color={color} size={size} />
              )} />
              <View style={styles.IconsContent}>
                <ButtonIcons color={"white"} size={30} Icon={({color, size}) => (
                  <Bell color={color} size={size} />
                )} />
                <ButtonIcons color={"white"} size={30} Icon={({color, size}) => (
                  <CircleUserRoundIcon color={color} size={size} />
                )} />
              </View>
            </View>
           </View>
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  )
}
export default forgottenPassword

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20,
  },
  IconsContent: {
    flexDirection: 'row',
    gap: 15
  },
  containerIcons: {
    flexDirection: 'row',
    gap: 260,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    alignItems: 'start',
    justifyContent: 'start',
    marginTop: 20,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 300,
  },colorButton: {
    backgroundColor: 'white',
  },
  TextButton: {
    color: 'black'
  },
  Button : {
    marginTop: 10
  },
  containerGetBackToLogin: {
    flexDirection: 'row', 
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  textLink: {
    color: '#34C759'
  }
})
