import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function MessageAutentication() {
  return (
    <LinearGradient
      colors={['#003B73', '#60A3D9']}
      end={{ x: 0, y: 1 }}
      locations={[0, 4]}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Image
              source={require('../../assets/images/Successmark.png')}
              style={styles.image}
            />
            <Text style={[styles.text, styles.title]}>Autenticação válida!</Text>
            <Text style={[styles.text, styles.subtitle]}>
              Insira o código de verificação que foi para a sua caixa de email para continuar!
            </Text>
            <Button
              title="Acessar Aplicativo"
              textStyles={styles.textButton}
              buttonStyle={styles.colorButton}
              handlePress={() => router.push('/home')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
    maxWidth: 270,
  },
  colorButton: {
    backgroundColor: 'white',
  },
  textButton: {
    color: 'black',
    textAlign: 'center',
  },
});
