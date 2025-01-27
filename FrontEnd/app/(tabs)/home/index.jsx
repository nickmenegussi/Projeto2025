import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Bell, CircleUserRoundIcon, Menu, MenuIcon} from 'lucide-react-native'
import ButtonIcons from '../../../components/ButtonIcons'


const Home = () => {

  return (
    <LinearGradient 
      colors={['#003B73', '#60A3D9']} 
      end={{ x: 0, y: 1 }} 
      locations={[0, 4]} 
      style={styles.linearGradient}
    >
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

      </SafeAreaView>

    </LinearGradient>
  )
}
export default Home

const styles = StyleSheet.create({
  ScrollContainerHorizontal: {
    flexDirection: 'row',
    alignItems: 'start',
    gap: 15
  },
  linearGradient: {
    flex: 1,
  },
  safeAreaView: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 20
  },
  Container: {
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
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'start',
  }, ButtonContainer: {
    width: 45,
  },

