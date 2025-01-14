import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, router } from "expo-router"
import FormField from '../../components/FormField'
import Button from '../../components/Button'

export default function SignIn() {
  const [form, setform] = useState({
    PrimeiroNome: '',
    SegundoNome: '',
    email: '',
    password: ''
  })

  return (
    <LinearGradient 
      colors={['#003B73', '#60A3D9']} 
      end={{ x: 0, y: 1 }} 
      locations={[0, 4]} 
      style={styles.linearGradient}
    >
      <ScrollView contentContainerStyle ={styles.scrollContainer} >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={[styles.text, styles.title]}>Cadsatre-se</Text>
            <Text style={[styles.text, styles.subtitle]}>Crie a sua conta ou faça seu login para explorar nosso app!</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => router.push(`/sign-up`)} activeOpacity={0.7} style={styles.button}>
                <Text style={{color: '#7D7D91'}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push(`/sign-in`)}  style={[styles.button, , styles.buttonActive]}>
                <Text style={styles.linkText}>Cadastro</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.FormsContainer}>
            <FormField 
            othersStyles={styles.formShort}  // Passando o estilo adicional para o campo de senha
            title="Primeiro Nome"
            value={form.PrimeiroNome}
            placeholder="Primeiro nome"
            handleChangeText={(e) => setform({ ...form, PrimeiroNome: e })}
            />

            <FormField 
            othersStyles={styles.formShort}
            title="Segundo Nome" 
            value={form.SegundoNome} 
            placeholder="Segundo nome" 
            handleChangeText={(e) => setform({...form, SegundoNome: e})} 
            />
          </View>
          
          <FormField 
          title="Email" 
          value={form.email} 
          placeholder="Digite seu email" 
          handleChangeText={(e) => setform({...form, email: e})} 
          />

          <FormField 
          title="Senha" 
          value={form.password} 
          placeholder="Digite sua senha" 
          handleChangeText={(e) => setform({...form, password: e})} 
          />
          
          
          <Button title='Cadastrar'  />

          
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center',
    paddingVertical: 20,
  },
  forgottenPasswordContainer:{
    marginRight: 10 ,
    marginTop: 10,
  },
  forgottenPassword: {
    color: 'white', 
    fontSize: 14, 
    fontWeight: '500', 
    },
  container: {
    width: '100%',
    alignItems: 'center',
    
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 300,
  },
  buttonContainer: {
    backgroundColor: '#E2E8F0',
    flexDirection: 'row',
    width: '100%',
    maxWidth: 360,
    padding: 2,
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    padding: 4,
    margin: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#FFFFFF',
  },
  linkText: {
    textAlign: 'center',
    color: '#003B73',
  },
  FormsContainer: {
    flexDirection: 'row',
    gap: 10
  },
  formShort: {
    width: 20,
    maxWidth: 10,
    minWidth: 175,
    borderRadius: 10,
    height: 40,
  },
})
