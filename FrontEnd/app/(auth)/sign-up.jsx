import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from "expo-router";
import FormField from '../../components/FormField';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [form, setform] = useState({
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
            <Text style={[styles.text, styles.title]}>Iniciar Login</Text>
            <Text style={[styles.text, styles.subtitle]}>Crie a sua conta ou faça seu login para explorar nosso app!</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => router.push(`/sign-up`)} activeOpacity={0.7} style={[styles.button, styles.buttonActive]}>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push(`/sign-in`)} style={styles.button}>
                <Text style={{color: '#7D7D91'}}>Cadastro</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FormField 
          title="Email"
          value={form.email}
          placeholder="Digite um email"
          handleChangeText={(e) => setform({ ...form, email: e })}
          />

          <FormField title="Password" value={form.password} placeholder="Digite uma senha" handleChangeText={(e) => setform({...form, password: e})} />
          
          <View style={styles.forgottenPasswordContainer}>
            <TouchableOpacity onPress={() => router.push('/forgottenPassword')} activeOpacity={0.5}>
              <Text  style={styles.forgottenPassword}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>
          <Button title='Entrar'  />

        </View>
      </ScrollView>
    </LinearGradient>
  );
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
    marginTop: 10,
    paddingRight: 15,
    marginLeft: 'auto',
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
    marginTop: 15,
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
  }
});
