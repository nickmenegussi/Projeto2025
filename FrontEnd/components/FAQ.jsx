import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MinusIcon, MoreVertical, PlusIcon } from "lucide-react-native";
import Button from "./Button";

export default function FAQ() {
  const [pergunta, setPergunta] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "O que é o Centro Espírita?",
      answer:
        "É um local onde se realiza práticas e estudos espíritas, como palestras, cursos, e trabalhos voluntários.",
    },
    {
      id: 2,
      question: "Como posso me tornar um voluntário?",
      answer:
        "Basta entrar em contato com a nossa equipe para mais informações sobre como participar.",
    },
    {
      id: 3,
      question: "Quando acontecem as palestras?",
      answer:
        "As palestras acontecem todas as semanas, confira nossa programação no calendário.",
    },
    {
      id: 4,
      question: "Quem pode ir ao centro Espírita?",
      answer:
        "Sim, as portas estão abertas para todos os interessados em conhecer o trabalho.",
    },
  ];

  // lidar com a questão de abrir e fechar a question
  const handleQuestion = (id) => {
    setPergunta(pergunta === id ? null : id);
    // se a pergunta já estive aberta, fechar, senão, exibir
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perguntas Frequentes</Text>
      {faqData.length > 0 ? (
        faqData.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => handleQuestion(item.id)}
              activeOpacity={0.4}
              style={styles.questionContainer}
            >
              <Text style={styles.questionText}>{item.question}</Text>

              {pergunta === item.id ? (
                <MinusIcon size={20} color={"white"} />
              ) : (
                <PlusIcon size={20} color={"white"} />
              )}
            </TouchableOpacity>
            {pergunta === item.id && (
              <Text style={styles.answerText}>{item.answer}</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>Nenhuma pergunta encontrada.</Text>
      )}
      <Button title={"Ver mais"} buttonStyle={styles.buttonNavagation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
  },buttonNavagation: {
    backgroundColor: '#003B73',
    flex: 1,
    width: '100% auto'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "start",
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  questionContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#60A3D9",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  answerText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  noDataText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
});
