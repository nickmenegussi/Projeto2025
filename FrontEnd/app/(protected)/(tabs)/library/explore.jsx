import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import useBooks from "../../../../hooks/useBooks";
import CardCustom from "../../../../components/CardCustom";
import ButtonIcons from "../../../../components/ButtonIcons";
import { ArrowRight } from "lucide-react-native";
import { router } from "expo-router";

const dadosIniciais = [
  { id: "1", nome: "Obras Complementares" },
  { id: "2", nome: "Obras Básicas" },
  { id: "3", nome: "Romance" },
  { id: "4", nome: "Saúde" },
];

export default function Explorar() {
  const [busca, setBusca] = useState("");
  const { booksComplementares, booksBasicas, loading } = useBooks();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  const data = [
    {
      id: 1,
      type: "Obras Complementares",
      data: booksComplementares || [],
      path: "/library/ObrasComplementares",
    },
    {
      id: 2,
      type: "Obras Básicas",
      data: booksBasicas || [],
      path: "/library/ObrasBasicas",
    },
  ];

  // Filtrar os dados com base na busca
  const dataFiltrada = data.filter((item) =>
    item.type.toLowerCase().includes(busca.toLowerCase().trim())
  );

  // filtrar os dados com base nos generos que existem no sistema
  const dadosFiltrados = dadosIniciais.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase().trim())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.TextContainer}>Explore</Text>
      <TextInput
        placeholder="Buscar..."
        value={busca}
        onChangeText={setBusca}
        style={styles.inputBusca}
      />
      <Text style={styles.titlerRenderItem}>Tópicos</Text>
      <View style={styles.ContainerRenderItem}>
        {dadosFiltrados.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => setBusca(item.nome)}
          >
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={dataFiltrada}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.titlerRenderItem}>{item.type}</Text>
              <ButtonIcons
                handleChange={() => router.push(`${item.path}`)}
                color={"white"}
                size={30}
                Icon={({ color, size }) => (
                  <ArrowRight color={color} size={size} />
                )}
              />
            </View>
            {/* atualizar para onde eu redireciono o usuario quando clica em cardCustom pois, tem livros que sao exibidos e nao sao loan ou reserve porem é obra complementar  */}
            <CardCustom data={item.data} loan={true} />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 150 }}
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
  TextContainer: {
    color: "white",
    fontSize: 24,
    borderBottomWidth: 3,
    borderBottomColor: "#60A3D9",
    maxWidth: 86,
    textAlign: "left",
    marginBottom: 15,
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
    gap: 5,
  },
  card: {
    backgroundColor: "#60A3D9",
    padding: 10,
    borderRadius: 12,
    minWidth: 110,
    alignItems: "center",
  },
  nome: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  titlerRenderItem: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    marginTop: 15,
  }, centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  }
});
