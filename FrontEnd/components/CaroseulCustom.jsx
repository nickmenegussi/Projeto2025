import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { router } from "expo-router";

export default function Calendar({content, pathname}) {
  return (
    <Carousel
      width={350}
      height={220}
      data={content}
      renderItem={(item) => (
        <View style={styles.SmallcarouselItem} key={item.idLecture}>
          <ImageBackground
            source={require("../assets/images/Jesus-Cristo.png")} // URL da sua imagem
            style={styles.BackgroundImage}
            imageStyle={styles.imageStyle}
          >
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={0.5}
              onPress={() =>
                router.push({
                  pathname: `${pathname}`,
                  params: { data: JSON.stringify(item.item) },
                })
              }
            >
              <View style={styles.item}>
                <Text style={styles.titlePostBigger}>
                  {item.item.nameLecture}
                </Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}
      scrollAnimationDuration={1000}
      autoPlay={true}
      loop={true}
      autoPlayInterval={3000}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 54,
      }}
    />
  );
}
const styles = StyleSheet.create({
  SmallcarouselItem: {
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: "column",
    height: 150,
  },
  BackgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  titlePostBigger: {
    fontSize: 16,
    color: "white",
    position: "relative",
    top: 160,
    left: 20,
    right: 10,
  },
});
