import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const dadosIniciais = [
  { id: "1", nome: "Futebol" },
  { id: "2", nome: "Basquete" },
  { id: "3", nome: "Tênis" },
  { id: "4", nome: "Natação" },
  { id: "5", nome: "Ciclismo" },
];

export default function Explorar() {
  const [busca, setBusca] = useState("");
  const [dados, setDados] = useState(dadosIniciais);

  const handleFiltreData = (text) => {
    setBusca(text);

    const dataFiltered = dadosIniciais.filter((item) =>
      item.nome.toLowerCase().includes(text.toLowerCase())
    );
    setDados(dataFiltered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => alert(`Selecionou: ${item.nome}`)}
    >
      <Text style={styles.nome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={() => (
          <View style={styles.containerHeader}>
            <Text style={styles.TextContainer}>Explore</Text>
            <TextInput
              placeholder="Buscar..."
              value={busca}
              onChangeText={handleFiltreData}
              style={styles.inputBusca}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 70,
    backgroundColor: "#003B73",
  },
  containerHeader: {
    flex: 1,
    gap: 24,
  },
  TextContainer: {
    color: "white",
    fontSize: 18,
    borderBottomWidth: 3,
    borderBottomColor: "#60A3D9",
    maxWidth: 70,
    textAlign: "left",
    paddingBottom: 4,
  },
  inputBusca: {
    height: 45,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#60A3D9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  nome: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
