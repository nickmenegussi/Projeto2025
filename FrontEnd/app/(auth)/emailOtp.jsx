import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, router } from "expo-router"
import FormField from '../../components/FormField'
import Button from '../../components/Button'
import { ArrowLeftIcon } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../context/auth'

export default function forgottenPassword() {
  const [email, setEmail] = useState("")
  const {OtpSendEmail} = useContext(AuthContext)

  async function OtpEntrar(){
    try {
      await OtpSendEmail(email)
      router.push('/sign-otp-verification')
    } catch (error) {
      console.error('Erro: ', error)

      if(error.response) {
        alert(`Erro: ${error.response.data.message}`)
      }
    }
  }

  return (
    
    <LinearGradient 
      colors={['#003B73', '#60A3D9']} 
      end={{ x: 0, y: 1 }} 
      locations={[0, 4]} 
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
            <TouchableOpacity onPress={() => router.push('/sign-up')} style={styles.returntoPage}>
              <ArrowLeftIcon color='white'  size={30}/>
            </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={[styles.text, styles.title]}>Digite seu Email</Text>
              <Text style={[styles.text, styles.subtitle]}>Não se preocupe. Isso pode ocorrer. Por favor, preencha o campo com o email para redefinir sua senha.</Text>
              <FormField titulo="Email" placeholder="Digite seu email" handleChangeText={() => setEmail(e.target.value)} />
              <Button title='Enviar Código' textStyles={styles.TextButton} buttonStyle={styles.colorButton} othersStyles={styles.Button}  handlePress={OtpEntrar}/>
            </View>                    
          </View>
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  )
}

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
  }
})
