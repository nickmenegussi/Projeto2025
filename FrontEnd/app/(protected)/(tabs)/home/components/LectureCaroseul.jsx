import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import styles from "../styles/homeStyles";
import { router } from "expo-router";

const LectureCarousel = ({ lectures }) => {
  if (!lectures || lectures.length === 0)
    return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <Carousel
      width={350}
      height={170}
      data={lectures}
      renderItem={(item) => (
        <View style={styles.SmallcarouselItem} key={item.item.idLecture}>
          <ImageBackground
            source={require("../../../../../assets/images/Jesus-Cristo.png")}
            style={styles.BackgroundImage}
            imageStyle={styles.imageStyle}
          >
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={0.5}
              onPress={() =>
                router.push({
                  pathname: "/home/lectures",
                  params: { data: JSON.stringify(lectures) },
                })
              }
            >
              <View style={styles.item}>
                <Text style={styles.titlePost}>{item.item.nameLecture}</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}
      scrollAnimationDuration={1000}
      autoPlay
      loop
      autoPlayInterval={3000}
      mode="parallax"
      modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 54 }}
    />
  );
};

export default LectureCarousel;