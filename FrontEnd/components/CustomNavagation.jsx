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

export default function CustomNavigation({
  trendingItems,
  otherStyles = false,
  sendData = false,
  normalPress = false,
  ...props
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  const handlePress = (index, item) => {
    setSelectedIndex(index);

    // Define largura e margem com base nos estilos
    const itemWidth = otherStyles ? 70 : 100;
    const marginRight = otherStyles ? 20 : 10;

    // Corrige a posição do underline com base no scroll atual
    const position = index * (itemWidth + marginRight) - scrollX;

    Animated.spring(translateX, {
      toValue: position,
      useNativeDriver: true,
    }).start();

    if (sendData === true) {
      const encodedData = encodeURIComponent(JSON.stringify(item));
      router.push({
        pathname: item.path,
        params: { data: encodedData },
      });
    }

    if (normalPress === true) {
      router.push({
        pathname: item.path,
      });
    }
  };

  return (
    <View style={[styles.wrapper, otherStyles && styles.wrapperSmall]}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.trendingContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
        contentContainerStyle={
          otherStyles ? styles.scrollContentSmall : styles.scrollContent
        }
      >
        {trendingItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index, item)}
            style={[
              styles.trendingItems,
              props.itemStyle,
              otherStyles && styles.NavigationItem,
              selectedIndex !== index && styles.trendimItemsUnselected,
              selectedIndex === index && otherStyles && styles.selectedNavItem,
            ]}
          >
            <Text
              style={[
                selectedIndex === index ? styles.navText : styles.unselectedText,
                props.textStyle,
                selectedIndex === index && otherStyles && styles.selectedNavText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Underline animado */}
      {otherStyles ? (
        <Animated.View
          style={[
            styles.flatUnderline,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      ) : (
        <Animated.View
          style={[
            styles.underline,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    position: "relative",
  },
  wrapperSmall: {
    marginTop: 10,
    height: 40,
    position: "relative",
  },
  trendingContainer: {
    flexDirection: "row",
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  scrollContentSmall: {
    paddingHorizontal: 15,
  },
  trendingItems: {
    width: 100,
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
    fontWeight: "bold",
  },
  unselectedText: {
    color: "#60A3D9",
    textAlign: "center",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 10, // alinhado com o paddingHorizontal
    width: 100,
    height: 6,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
  },
  NavigationItem: {
    width: 70,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 20,
    height: 40,
  },
  selectedNavItem: {
    // estilo extra se necessário
  },
  selectedNavText: {
    color: "white",
    fontWeight: "bold",
  },
  flatUnderline: {
    position: "absolute",
    bottom: 0,
    width: 70,
    height: 3,
    backgroundColor: "white",
    left: 15, // alinhado com o paddingHorizontal
  },
  trendimItemsUnselected: {
    backgroundColor: "transparent",
  },
});
