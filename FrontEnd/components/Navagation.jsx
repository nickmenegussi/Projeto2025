import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const { width: screenWidth } = Dimensions.get('window');

const Trending = ({
  navagations,
  path,
  disablePress = true,
  textTitlle = false,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {navagations.map((item) => (
          <View key={item.name} style={styles.contentNavagations}>
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
        ))}
      </ScrollView>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    width: screenWidth, // Ocupa 100% da largura
    marginLeft: -16, // Compensa o padding horizontal do container pai
  },
  scrollView: {
    width: screenWidth,
  },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16, // Adiciona padding lateral
    flexDirection: "row",
    alignItems: "center",
    minWidth: screenWidth, // Garante que o conteúdo ocupe pelo menos a largura da tela
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
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  TextContent: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});