import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftIcon } from "lucide-react-native";
import CustomNavagation from "../../../components/CustomNavagation";
import FormField from "../../../components/FormField";
import { router } from "expo-router";

export default function ReviewSociety() {
  const [reviewUser, setReviewUser] = useState({
    description: '',
    ratingNumber: null
  })


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
            onPress={() => router.back("/home/faq")}
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
        <FormField
        title="Review"
        placeholder="Digite uma senha"
        value={reviewUser.description}
        handleChangeText={(text) =>
          setReviewUser((e) => ({ ...e, description: text }))
        }
        othersStyles={styles.buttonContainer}
        textInputSmall={styles.textInputSmall}
        IconStyle={styles.ReviewButton}
      />
     </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  BackGroundSafeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  }, buttonContainer: {
    marginTop: 15,
    maxWidth: 330,
    minWidth: 330,
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
  }, textInputSmall: {
    width: '80%'
  }, ReviewButton:{
    padding: 0,
    right: 10,
    position: 'relative'
  }
});
