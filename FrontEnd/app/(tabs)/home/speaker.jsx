import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const speaker = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>O que ele faz?</Text>
      
      <View style={styles.card}>
        <Text style={styles.name}>Nome do Palestrante</Text>
        <Text style={styles.description}>
          Por favor, adicione seu conteúdo aqui. Mantenha curto, simples e sorria :)
        </Text>
        
        <Text style={styles.sectionTitle}>Contribuições:</Text>
        <View style={styles.tagContainer}>
          
        </View>
        
        <Text style={styles.sectionTitle}>Expertise:</Text>
        <View style={styles.tagContainer}>
        </View>
        
        <Text style={styles.sectionTitle}>Cargo atual:</Text>
        <View style={styles.tagContainer}>
            
        </View>
        
        <Text style={styles.quote}>
          "A persistência é o caminho do êxito."
        </Text>
      </View>

      <Text style={styles.socialTitle}>Encontre ele nas redes sociais abaixo:</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity>
          <FontAwesome name="instagram" size={24} color="#E1306C" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#A7D0FF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003B73',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#003B73',
    borderRadius: 10,
    padding: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#60A3D9',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: 'white',
    fontSize: 14,
  },
  quote: {
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 15,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003B73',
    marginTop: 20,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 15,
  },
});

export default speaker;
