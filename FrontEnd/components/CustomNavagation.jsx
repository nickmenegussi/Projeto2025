import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";

export default function CustomNavagation({
  trendingItems,
  otherStyles,
  disablePress = false,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const handlePress = (index, item) => {
    setSelectedIndex(index);
    Animated.spring(translateX, {
      toValue: index * 110, // 100 de largura + 10 de margem
      useNativeDriver: true,
    }).start();

    if (disablePress !== false) {
      const encodedData = encodeURIComponent(JSON.stringify(item));
      router.push({
        pathname: item.path,
        params: { data: encodedData },
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.trendingContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trendingItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index, item)}
            style={[styles.trendingItems, otherStyles]}
          >
            <Text style={styles.navText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Animated.View
        style={[
          styles.underline,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 60, // espaço pra underline
    position: "relative",
  },
  trendingContainer: {
    flexDirection: "row",
  },
  trendingItems: {
    width: 100 ,
    alignItems: "center",
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    justifyContent: "center",
    height: 30,
    marginRight: 10,
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
});
