import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";

export default function CustomNavagation({ trendingItems }) {
  const [selectedIndex, setSelecetIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current; // Controle da posição do sublinhado

  const handlePress = (index) => {
    setSelecetIndex(index);
    Animated.spring(translateX, {
      toValue: index * 110, // Multiplica pelo tamanho do item (ajuste se necessário)
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.ContentContainer}>
      <View style={styles.trendingContainer}>
        {trendingItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={styles.trendingItems}
          >
            <Text style={styles.navText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[styles.underline, { transform: [{ translateX }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  trendingContainer: {
    flexDirection: "row",
    marginTop: 10,
    position: "relative",
    marginBottom: 30,
    gap: 10,
  },
  trendingItems: {
    width: 100,
    alignItems: "center",
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    justifyContent: "center",
    height: 30,
  },
  navText: {
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 10,
    width: 100, // Deve ser igual à largura do item
    height: 8,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
  },
  ContentContainer: {
    paddingLeft: 10,
    flex: 1,
    gap: 20,
  },
});
