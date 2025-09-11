import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import EmptyContent from "../../../../../components/EmptyContent";
import styles from "../styles/homeStyles";

const VolunteerWorkCarousel = ({ volunteerWork }) => {
  const router = useRouter();

  if (!volunteerWork || volunteerWork.length === 0)
    return <EmptyContent title="Ops! Nada por aqui" subtitle="Tente novamente mais tarde" />;

  return (
    <Carousel
      width={350}
      height={220}
      data={volunteerWork}
      renderItem={(item) => (
        <View style={styles.SmallcarouselItem} key={item.item.idVolunteerWork}>
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
                  pathname: "/home/volunteerWork",
                  params: { data: JSON.stringify(item.item) },
                })
              }
            >
              <View style={styles.item}>
                <Text style={styles.titlePostBigger}>
                  {item.item.nameVolunteerWork || ""}
                </Text>
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

export default VolunteerWorkCarousel;