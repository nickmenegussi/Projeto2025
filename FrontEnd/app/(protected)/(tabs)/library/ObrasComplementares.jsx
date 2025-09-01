import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useBooks from "../../../../hooks/useBooks";
import CardCustom from "../../../../components/CardCustom";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";

export default function ObrasComplementares() {
  const { booksComplementares, loading } = useBooks();

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  const chunkedBooksLoans = chunkArray(
    booksComplementares.filter((book) => book.bookCategory === "emprestimo"),
    8
  );
  const chunkedBooksReserve = chunkArray(
    booksComplementares.filter((book) => book.bookCategory === "reserva"),
    8
  );

  const data = [
    {
      id: 1,
      type: "Obras Complementares para Empréstimo",
      data: chunkedBooksLoans || [],
    },
    {
      id: 2,
      type: "Obras Complementares para Reserva",
      data: chunkedBooksReserve || [],
    },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20, gap: 20 }}>
          <Text style={styles.sectionTitle}>{item.type}</Text>
          {/* aqui eu tenho que iterar de novo na lista que eu recebo pq para exibir uma limitação de itens por colunas eu fica nesse formato:  [ livro1, livro2, livro3, livro4 ],   // chunk 1
            [ livro5, livro6 ] um array de array */}
          {item.data.map((books) =>
            item.type === "Obras Complementares para Empréstimo" ? (
              <CardCustom
                key={books[0].idLibrary}
                data={books}
                aboutBookLoan={true}
              />
            ) : (
              <CardCustom
                key={books[0].idLibrary}
                data={books}
                aboutBookReserves={true}
              />
            )
          )}
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={styles.HeaderComponent}>
          <TouchableOpacity
            style={styles.ReturnButton}
            activeOpacity={0.6}
            onPress={() => router.push("/library/explore")}
          >
            <ArrowLeftIcon size={30} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.header}>Obras Complementares</Text>
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#003B73",
    padding: 20,
    paddingBottom: 130,
    paddingVertical: 60,
  },
  ReturnButton: {
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    width: 40,
    maxWidth: 40,
    height: 40,
    maxHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  HeaderComponent: {
    flexDirection: "row",
    gap: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
  sectionTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
