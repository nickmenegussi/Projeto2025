import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const forgottenPassword = () => {

  return (
    
    <LinearGradient 
      colors={['#003B73', '#60A3D9']} 
      end={{ x: 0, y: 1 }} 
      locations={[0, 4]} 
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
           
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
  returntoPage: {
    backgroundColor: '#60A3D9',
    borderRadius: 10,
    width: 40,
    maxWidth: 40,
    height: 40,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    left: 10
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 130

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
