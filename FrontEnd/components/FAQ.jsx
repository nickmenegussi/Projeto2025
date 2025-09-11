import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import React, { useState, useRef } from "react";
import { MinusIcon, PlusIcon, ChevronRightIcon } from "lucide-react-native";
import Button from "./Button";

export default function FAQ() {
  const [pergunta, setPergunta] = useState(null);
  const animationValues = useRef({}); // Para armazenar as animações de cada item

  const faqData = [
    {
      id: 1,
      question: "O que é o Centro Espírita?",
      answer: "É um local onde se realiza práticas e estudos espíritas, como palestras, cursos, e trabalhos voluntários.",
    }, 
    {
      id: 2,
      question: "Como posso me tornar um voluntário?",
      answer: "Você pode entrar em contato conosco através do formulário de voluntariado ou comparecer a uma de nossas reuniões.",
    },
    {
      id: 3,
      question: "Quais são os horários de funcionamento?",
      answer: "Funcionamos de segunda a sexta das 8h às 20h, e aos sábados das 8h às 12h.",
    },
    {
      id: 4,
      question: "Há algum custo para participar das atividades?",
      answer: "Todas as nossas atividades são gratuitas e abertas ao público.",
    }
  ];

  // Inicializar valores animados para cada item
  faqData.forEach(item => {
    if (!animationValues.current[item.id]) {
      animationValues.current[item.id] = new Animated.Value(0);
    }
  });

  const handleQuestion = (id) => {
    if (pergunta === id) {
      // Fechar a pergunta atual com animação
      Animated.timing(animationValues.current[id], {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => setPergunta(null));
    } else {
      // Se já havia uma pergunta aberta, fechar primeiro
      if (pergunta) {
        Animated.timing(animationValues.current[pergunta], {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
      
      // Abrir nova pergunta com animação
      setPergunta(id);
      Animated.timing(animationValues.current[id], {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  const getAnimatedHeight = (id) => {
    return animationValues.current[id].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100], // Ajuste conforme o tamanho do conteúdo
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perguntas Frequentes</Text>
      
      {faqData.length > 0 ? (
        faqData.map((item) => {
          const isOpen = pergunta === item.id;
          
          return (
            <View key={item.id} style={[styles.itemContainer, isOpen && styles.itemContainerOpen]}>
              <TouchableOpacity
                onPress={() => handleQuestion(item.id)}
                activeOpacity={0.7}
                style={[styles.questionContainer, isOpen && styles.questionContainerOpen]}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <View style={styles.iconContainer}>
                  <Animated.View
                    style={{
                      transform: [
                        {
                          rotate: animationValues.current[item.id].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg']
                          })
                        }
                      ]
                    }}
                  >
                    {isOpen ? (
                      <MinusIcon size={20} color={"white"} />
                    ) : (
                      <PlusIcon size={20} color={"white"} />
                    )}
                  </Animated.View>
                </View>
              </TouchableOpacity>
              
              <Animated.View 
                style={[
                  styles.answerContainer,
                  { 
                    height: getAnimatedHeight(item.id),
                    opacity: animationValues.current[item.id]
                  }
                ]}
              >
                <Text style={styles.answerText}>{item.answer}</Text>
              </Animated.View>
            </View>
          );
        })
      ) : (
        <Text style={styles.noDataText}>Nenhuma pergunta encontrada.</Text>
      )}
      
      <View style={styles.buttonContainer}>
        <Button 
          title={"Ver mais perguntas"} 
          buttonStyle={styles.buttonNavigation}
          textStyle={styles.buttonText}
          iconRight={<ChevronRightIcon size={18} color="#FFFFFF" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#60A3D9",
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContainerOpen: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  questionContainer: {
    padding: 16,
    backgroundColor: "#003B73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionContainerOpen: {
    backgroundColor: "#0A73D9",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  answerContainer: {
    overflow: "hidden",
  },
  answerText: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
    padding: 16,
    paddingTop: 8,
  },
  noDataText: {
    textAlign: "center",
    color: "#E5E7EB",
    fontSize: 16,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonNavigation: {
    backgroundColor: "#003B73",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});