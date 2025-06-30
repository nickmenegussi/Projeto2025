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
  { id: "1", nome: "Obras Complementares" },
  { id: "2", nome: "Obras básicas" },
  { id: "3", nome: "Romance" },
  { id: "4", nome: "Saúde" },
];

export default function Explorar() {
  const [busca, setBusca] = useState("");
  const [dados, setDados] = useState(dadosIniciais);

  const handleFiltreData = (text) => {
    setBusca(text);

    const dataFiltered = dadosIniciais.filter((item) =>
      item.nome.toLowerCase().includes(text.toLowerCase())
    );
    setDados(dataFiltered)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.TextContainer}>Explore</Text>
        <TextInput
          placeholder="Buscar..."
          value={busca}
          onChangeText={handleFiltreData}
          style={styles.inputBusca}
        />
        <View>
          <Text style={styles.titlerRenderItem}>Tópicos</Text>
        </View>
      </View>
      <View style={styles.ContainerRenderItem}>
        {dados.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => alert(`Selecionou: ${item.nome}`)}
          >
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <FlatList
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
            <View>
              <Text style={styles.titlerRenderItem}>Tópicos</Text>
            </View>
          </View>
        )}
      /> */}
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
    fontSize: 16,
  },
  ContainerRenderItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5
  },
  card: {
    backgroundColor: "#60A3D9",
    padding: 10,
    borderRadius: 12,
    minWidth: 110, // ajuste para o tamanho desejado
    alignItems: "center",
  },
  nome: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  titlerRenderItem: {
    fontSize: 22,
    color: "white",
    marginBottom: 15,
  },
});
