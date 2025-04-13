import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ArrowLeftIcon } from "lucide-react-native";
import CustomNavagation from "../../../components/CustomNavagation";
import FormField from "../../../components/FormField";

export default function ReviewSociety() {
  return (
    <ScrollView style={styles.BackGroundSafeArea}>
      <ImageBackground
        imageStyle={styles.imageStyle}
        style={styles.BackGround}
        source={require("../../../assets/images/Jesus-Cristo.png")}
      >
        <View>
          <TouchableOpacity
            style={styles.ButtonIcon}
            onPress={() => router.back("/home/lectures")}
          >
            <ArrowLeftIcon color="black" size={40} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.containerView}>
        <CustomNavagation
          trendingItems={[
            { name: "Objetivo #1" },
            { name: "Objetivo #2" },
            { name: "Avaliar Casa", path: "/home/reviewSociety" },
          ]}
          otherStyles={true}
          normalPress={true}
          sendData={false}
        />
        <Text style={styles.textContainerView}>Seja o Primeiro a adicionar uma avaliação!</Text>
        <FormField placeholder={'Fazer uma avaliação.'} othersStyles={styles.buttonContainer}/>
     </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  BackGroundSafeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  }, buttonContainer: {
    marginTop: 0
  },
  containerView: {
    flex: 1,
    padding: 20,
    gap: 20
  },
  ButtonIcon: {
    position: "relative",
    top: 40,
    left: 20,
  },
  BackGround: {
    width: "100%",
    height: 300,
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 10,
  }, textContainerView: {
    color: 'white',
    fontSize: 18
  }
});
