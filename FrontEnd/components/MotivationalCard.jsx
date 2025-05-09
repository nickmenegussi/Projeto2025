import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function QuoteCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.quoteMarkLeft}>“</Text>
      <Text style={styles.quoteMarkRight}>”</Text>

      <Text style={styles.hashtag}>#ESPIRITUALLY ALWAYS</Text>

      <Text style={styles.quote}>
        <Text style={styles.bold}>Be fearful</Text> when others{'\n'}
        are greedy and{'\n'}
        <Text style={styles.bold}>to be greedy</Text> only when{'\n'}
        others are{'\n'}
        <Text style={styles.bold}>fearful.</Text>
      </Text>

      <View style={styles.authorContainer}>
        <Image
          source={require('../assets/images/default-profile.jpg')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.author}>Warren Buffett</Text>
          <Text style={styles.company}>Berkshire Hathaway</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7FBFFF',
    padding: 20,
    borderRadius: 10,
    width: '70%',
    
    marginTop: 10,
  },
  quoteMarkLeft: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 100,
    color: 'rgba(46, 46, 46, 0.1)', // Cor clara e transparente
    fontFamily: 'serif',
    zIndex: 0, 
  },
  quoteMarkRight: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 100,
    color: 'rgba(46, 46, 46, 0.1)',
    fontFamily: 'serif',
    zIndex: 0,
  },
  hashtag: {
    color: '#2E2E2E',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center', // ou 'left' conforme a imagem
  },
  quote: {
    fontSize: 22,
    color: '#2E2E2E',
    lineHeight: 32,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
    zIndex: 1, 
  },
  bold: {
    fontWeight: '700',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center', // Centraliza o autor (ou ajuste para 'flex-start')
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  company: {
    fontSize: 12,
    color: '#555',
  },
});