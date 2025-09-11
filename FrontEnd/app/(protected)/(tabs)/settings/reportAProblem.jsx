import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ArrowLeftIcon, BugIcon, SendIcon } from "lucide-react-native";
import { router } from 'expo-router';
import React, { useState } from 'react';

const ReportAProblem = () => {
  const [problemType, setProblemType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const problemTypes = [
    { id: 'technical', label: 'Problema Técnico' },
    { id: 'content', label: 'Conteúdo Inadequado' },
    { id: 'loan', label: 'Problema com Empréstimo' },
    { id: 'account', label: 'Problema com Conta' },
    { id: 'other', label: 'Outro' },
  ];

  const handleSubmit = async () => {
    if (!problemType || !description) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (description.length < 10) {
      Alert.alert('Atenção', 'Por favor, forneça mais detalhes sobre o problema.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Obrigado!', 
        'Seu problema foi reportado com sucesso. Entraremos em contato em breve.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => router.back()}
        >
          <ArrowLeftIcon size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reportar Problema</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.iconContainer}>
          <BugIcon size={48} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>Como podemos ajudar?</Text>
        <Text style={styles.subtitle}>
          Descreva o problema que você encontrou para que possamos resolvê-lo o mais rápido possível.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Tipo de Problema *</Text>
          <View style={styles.optionsContainer}>
            {problemTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.optionButton,
                  problemType === type.id && styles.optionButtonSelected
                ]}
                onPress={() => setProblemType(type.id)}
              >
                <Text style={[
                  styles.optionText,
                  problemType === type.id && styles.optionTextSelected
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Descrição do Problema *</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={6}
            placeholder="Descreva detalhadamente o problema que você está enfrentando..."
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Text style={styles.submitButtonText}>Enviando...</Text>
            ) : (
              <>
                <SendIcon size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.submitButtonText}>Enviar Relatório</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{height: 75}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff22",
    position: 'relative',
  },
  returnButton: {
    position: "absolute",
    left: 20,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionButtonSelected: {
    backgroundColor: '#60A3D9',
    borderColor: '#60A3D9',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minHeight: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#60A3D9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportAProblem;