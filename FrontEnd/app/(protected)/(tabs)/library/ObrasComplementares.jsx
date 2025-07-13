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

  const chunkedBooks = chunkArray(booksComplementares, 8);

  return (
    <FlatList
      data={chunkedBooks}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20 }}>
          <CardCustom data={item} />
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={styles.HeaderComponent}>
          <TouchableOpacity
            style={styles.ReturnButton}
            activeOpacity={0.6}
            onPress={() => router.replace("/library/explore")}
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
    paddingVertical: 60,
    flex: 1
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
  }, HeaderComponent: {
    flexDirection: 'row',
    gap: 20
  }, 
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003B73",
  },
});
