import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function FAQ() {
  const [pergunta, setPergunta] = useState(null)

  const faqData = [
    { id: 1, question: 'O que é o Centro Espírita?', answer: 'É um local onde se realiza práticas e estudos espíritas, como palestras, cursos, e trabalhos voluntários.' },
    { id: 2, question: 'Como posso me tornar um voluntário?', answer: 'Basta entrar em contato com a nossa equipe para mais informações sobre como participar.' },
    { id: 3, question: 'Quando acontecem as palestras?', answer: 'As palestras acontecem todas as semanas, confira nossa programação no calendário.' },
    { id: 4, question: 'Posso visitar o Centro Espírita sem ser membro?', answer: 'Sim, as portas estão abertas para todos os interessados em conhecer o trabalho.' },
  ];

  const handleQuestion = (id) => {
    setPergunta(pergunta === id ? null : id)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perguntas Frequentes</Text>
      {faqData.length > 0 ? (
        faqData.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleQuestion(item.id)} activeOpacity={0.4} style={styles.questionContainer}>
              <Text style={styles.questionText}>{item.question}</Text>
            </TouchableOpacity>
            {pergunta === item.id && (
              <Text style={styles.answerText}>{item.answer}</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>Nenhuma pergunta encontrada.</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'start',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  questionContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#003B73',
    borderRadius: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  }
})
