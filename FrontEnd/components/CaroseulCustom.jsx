import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { router } from "expo-router";
import Button from "./Button";

export default function CarouselCustom({
  content,
  pathname,
  differentRender = false,
}) {
  const defaultRenderItem = (item) => {
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
        <Text style={styles.titlePostBigger}>{item.item.nameLecture}</Text>
      </View>
    </TouchableOpacity>;
  };

  const renderDifferentItem = (item) => {
    <View style={styles.overlay}>
      <View style={styles.Items}>
        <Text style={styles.titleContent}>{item.nameLecture}</Text>
        <Button
          title={"Acessar Palestra"}
          buttonStyle={styles.Button}
          handlePress={() => {
            // const encondedData = encodeURIComponent(JSON.stringify(item));
            // const lecturesEncondedData = encodeURIComponent(
            //   JSON.stringify(lectures)
            // );
            router.push(`/library/aboutBook`);
          }}
        />
      </View>
    </View>;
  };

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
            {differentRender ? renderDifferentItem(item) : defaultRenderItem(item)}
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
  overlayContainerView: {
    justifyContent: "center", // Garante que o conteúdo fique no centro
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Escurecimento suave
    borderRadius: 10,
  },
  titlePostBigger: {
    fontSize: 16,
    color: "white",
    position: "relative",
    top: 160,
    left: 20,
    right: 10,
  },
  Items: {
    flex: 1,
    marginTop: 40,
    gap: 40,
    left: 20,
  },
  Button: {
    width: 150,
  },
  titleContent: {
    color: "black",
    fontSize: 14,
  }, item: {
    width: "50%",
    borderColor: "#fff",
    height: 55,
  },
});
