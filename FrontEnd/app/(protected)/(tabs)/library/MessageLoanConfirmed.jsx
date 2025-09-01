import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function MessageLoanConfirmed() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/SucessOrder.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Empréstimo Confirmado!</Text>
      <Text style={styles.subtitle}>
        Seu empréstimo foi confirmado com sucesso! Agradecemos pela sua reserva de Empréstimo! Um recibo completo será enviado para o seu e-mail.Por favor, esteja ciente dos prazos e instruções de retirada..
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/library')}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Voltar para a Biblioteca</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B73',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 140,
    height: 100,
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#60A3D9',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});