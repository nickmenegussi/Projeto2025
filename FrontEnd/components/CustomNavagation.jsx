import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";

export default function CustomNavagation({ trendingItems, otherStyles, disablePress = true }) {
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
    <>
      <View>
        <FlatList
          data={trendingItems}
          horizontal
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <View style={[styles.ContentContainer]}>
              <View style={styles.trendingContainer}>
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    const encondedData = encodeURIComponent(JSON.stringify(item))
                    handlePress(index)
                    disablePress === true ? router.navigate(`${item.path}?data=${encondedData}`)
                    : null
                  }}
                  style={[styles.trendingItems, otherStyles]}
                >
                  <Text style={styles.navText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <Animated.View
          style={[
            styles.underline,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 10,
  },
  trendingContainer: {
    flexDirection: "row",
    marginTop: 10,
    position: "relative",
    marginBottom: 30,
    gap: 10,
  },
  trendingItems: {
    minWidth: 100, // Permite que o botão cresça conforme o texto
    alignItems: "center",
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    justifyContent: "center",
    height: 30,
    paddingHorizontal: 15, // Adiciona um espaçamento interno
  },
  navText: {
    color: "white",
    textAlign: "center",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 100,
    height: 6,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
  },
  ContentContainer: {
    flex: 1,
    gap: 10,
  },
});
