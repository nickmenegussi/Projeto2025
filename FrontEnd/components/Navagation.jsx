import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const Trending = ({
  navagations,
  path,
  disablePress = true,
  textTitlle = false,
}) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={styles.FlatListContainer}
      data={navagations}
      nestedScrollEnabled={true}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <>
          <View style={styles.contentNavagations}>
            {textTitlle !== false ? (
              <Text style={styles.textTitle}>{item.type}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.CardNavagation}
              onPress={
                disablePress === false
                  ? null
                  : () =>
                      router.navigate({
                        pathname: item.path,
                        params: { data: JSON.stringify(item.data) },
                      })
              }
              activeOpacity={0.6}
            >
              <Text style={styles.TextContent}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      horizontal
      contentContainerStyle={styles.FlatListContainer}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  FlatListContainer: {
    paddingVertical: 12,
  },
  contentNavagations: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 12,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E0E0E0",
    marginBottom: 6,
  },
  CardNavagation: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#0055A5",
    minWidth: 100, // garante largura mínima
    alignItems: "center", // centraliza o texto
    justifyContent: "center",
  },
  TextContent: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});
