import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const dadosIniciais = [
  { id: '1', nome: 'Futebol' },
  { id: '2', nome: 'Basquete' },
  { id: '3', nome: 'Tênis' },
  { id: '4', nome: 'Natação' },
  { id: '5', nome: 'Ciclismo' },
  // adicione mais itens
];

export default function Explorar() {
  const [busca, setBusca] = useState('');
  const [dados, setDados] = useState(dadosIniciais);

  // filtra itens conforme texto digitado
  const filtrarDados = (texto) => {
    setBusca(texto);
    const dadosFiltrados = dadosIniciais.filter(item =>
      item.nome.toLowerCase().includes(texto.toLowerCase())
    );
    setDados(dadosFiltrados);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => alert(`Selecionou: ${item.nome}`)}>
      <Text style={styles.nome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar..."
        value={busca}
        onChangeText={filtrarDados}
        style={styles.inputBusca}
      />
      <FlatList
        data={dados}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputBusca: {
    height: 45,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  nome: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});