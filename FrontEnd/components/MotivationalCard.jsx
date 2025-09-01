import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

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
    backgroundColor: '#7FBFFF',
    padding: 25,
    borderRadius: 16,
    width: '75%',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  quoteMarkLeft: {
    position: 'absolute',
    top: 0,
    left: 15,
    fontSize: 120,
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'serif',
    zIndex: 0,
    lineHeight: 120,
  },
  quoteMarkRight: {
    position: 'absolute',
    bottom: -20,
    right: 10,
    fontSize: 120,
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'serif',
    zIndex: 0,
    lineHeight: 120,
  },
  hashtag: {
    color: '#2E2E2E',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 1,
  },
  quote: {
    fontSize: 24,
    color: '#2E2E2E',
    lineHeight: 36,
    fontWeight: '400',
    marginBottom: 25,
    textAlign: 'center',
    zIndex: 1,
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: '800',
    color: '#1A1A1A',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  authorInfo: {
    marginLeft: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  author: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1A1A1A',
  },
  company: {
    fontSize: 13,
    color: '#444',
    fontStyle: 'italic',
  },
});