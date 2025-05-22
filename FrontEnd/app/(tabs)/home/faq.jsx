import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { ArrowLeftIcon } from "lucide-react-native";
import CustomNavagation from "../../../components/CustomNavagation";
import { router } from "expo-router";

const FAQ = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{paddingBottom: 150 }}>
        <ImageBackground
          imageStyle={styles.imageStyle}
          style={styles.background}
          source={require("../../../assets/images/Jesus-Cristo.png")}
        >
          <View>
            <TouchableOpacity
              style={styles.ButtonIcon}
              onPress={() => router.back("/home/index")}
            >
              <ArrowLeftIcon color="black" size={40} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.ContainerContent}>
          <Text style={styles.textContent}>
            Qual é o objetivo da casa Espírita Gabriel Delanne?
          </Text>

          <View>
            <View style={styles.lineNavagation}></View>
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
          </View>
          <View>
            <Image
              style={styles.ImageContent}
              source={require("../../../assets/images/foto.png")}
            />
          </View>
          <View style={styles.line}></View>
          <View>
            <Text style={styles.textContent}>A palestra</Text>
          </View>
          <View style={styles.line}></View>
          <View>
            <Text style={styles.SmalltextContent}>
              O objetivo das palestras Espíritas é proporcionar um espaço de
              reflexão e aprendizado sobre os princípios da doutrina Espírita,
              promovendo o desenvolvimento moral e espiritual dos participantes.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 405,
    backgroundColor: "#003B73",
  },
  ButtonIcon: {
    position: "relative",
    top: 40,
    left: 10,
  },
  background: {
    width: "100%",
    height: 300,
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 10,
  },
  ContainerContent: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  textContent: {
    fontSize: 20,
    color: "white",
  },
  SmalltextContent: {
    color: "white",
    fontWeight: "regular",
    fontSize: 17,
  },
  line: {
    width: "100%",
    borderWidth: 0.6,
    borderColor: "white",
  },
});
