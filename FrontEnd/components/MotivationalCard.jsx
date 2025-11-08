import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

// Obtém a largura da tela para melhor responsividade
const { width } = Dimensions.get('window'); 

export default function QuoteCard() {
  return (
    <View style={styles.container}>
      {/* Marcadores de citação grandes e discretos (zIndex 0) */}
      <Text style={styles.quoteMarkLeft}>“</Text>
      <Text style={styles.quoteMarkRight}>”</Text>

      {/* Hashtag com estilo mais suave */}
      <Text style={styles.hashtag}>#REFLEXÃO_DO_DIA</Text>

      {/* Texto da Citação (zIndex 1) */}
      <Text style={styles.quote}>
        <Text style={styles.bold}>Be fearful</Text> when others{'\n'}
        are greedy and{'\n'}
        <Text style={styles.bold}>to be greedy</Text> only when{'\n'}
        others are{'\n'}
        <Text style={styles.bold}>fearful.</Text>
      </Text>

      {/* Contêiner do Autor */}
      <View style={styles.authorContainer}>
        {/* Usando uma imagem de exemplo. Lembre-se de verificar o caminho! */}
        <Image
          source={require('../assets/images/default-profile.jpg')} 
          style={styles.avatar}
        />
        <View style={styles.authorInfo}>
          <Text style={styles.author}>Warren Buffett</Text>
          <Text style={styles.company}>Berkshire Hathaway</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // 🎨 Mudança 1: Cor de fundo para combinar com o tema escuro da biblioteca
    backgroundColor: '#003B73', // Azul escuro
    padding: 30,
    borderRadius: 16,
    // 🎨 Mudança 2: Adaptabilidade para ocupar 90% da largura da tela
    width: width * 0.9, 
    marginVertical: 20, 
    // Sombra sutil para destacar
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 15,
    alignSelf: 'center', // Centraliza o container
  },
  // 🎨 Melhoria: Aspas mais integradas ao tema escuro
  quoteMarkLeft: {
    position: 'absolute',
    top: -5,
    left: 10,
    fontSize: 100, // Ligeiramente menor para não dominar
    color: 'rgba(255, 255, 255, 0.1)', // Mais discreto no fundo escuro
    fontFamily: 'serif',
    zIndex: 0,
    lineHeight: 100,
  },
  quoteMarkRight: {
    position: 'absolute',
    bottom: -15,
    right: 10,
    fontSize: 100,
    color: 'rgba(255, 255, 255, 0.1)',
    fontFamily: 'serif',
    zIndex: 0,
    lineHeight: 100,
  },
  hashtag: {
    // 🎨 Mudança: Cor para destacar no fundo escuro
    color: '#60A3D9', // Azul claro, cor de destaque
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 2, // Maior espaçamento para #
  },
  quote: {
    // 🎨 Mudança: Cor principal do texto mais clara
    fontSize: 26,
    color: '#F0F0F0', // Cinza muito claro para o texto principal
    lineHeight: 40,
    fontWeight: '400',
    marginBottom: 35, // Aumenta o espaço
    textAlign: 'center',
    zIndex: 1,
    fontStyle: 'italic',
  },
  bold: {
    // 🎨 Mudança: Cor de destaque para as palavras-chave
    fontWeight: '900', // Torna o negrito mais forte
    color: '#FFFFFF', // Branco puro para máximo destaque
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    // 🎨 Melhoria: Fundo mais sutil para o autor
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  authorInfo: {
    marginLeft: 15,
  },
  avatar: {
    width: 48, // Ligeiramente maior
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#60A3D9', // Borda com a cor de destaque
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  company: {
    fontSize: 14,
    color: '#CCCCCC',
    fontStyle: 'normal', // Remove o itálico para mais clareza
  },
});