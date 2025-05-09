import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen({image = false}) {
  return (
    <View style={styles.container}>
      {image === true && (
        <Image
        source={require('../assets/images/icon.png')} // ajuste o caminho se necessário
        style={styles.logo}
        resizeMode="contain"
      />
      )}
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>Carregando os conteúdos do seu Centro Espírita...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B73',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  text: {
    marginTop: 16,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
