import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { ArrowLeftIcon } from "lucide-react-native"
import { router } from 'expo-router'
import CustomNavagation from "../../../components/CustomNavagation"

const Speaker = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <ImageBackground
          imageStyle={styles.imageStyle}
          style={styles.background}
          source={require("../../../assets/images/Jesus-Cristo.png")}
        >
          <View>
            <TouchableOpacity style={styles.ButtonIcon} onPress={() => router.push('/home/lectures')}>
              <ArrowLeftIcon color='black' size={40} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>


      <View style={{ padding: 10 }}>
        <Text style={styles.title}>O que ele faz?</Text>

        <View style={styles.card}>
          <Text style={styles.name}>Nome do Palestrante</Text>
          <Text style={styles.description}>
            Por favor, adicione seu conteúdo aqui. Mantenha curto, simples e
            sorria :)
          </Text>

          <Text style={styles.sectionTitle}>Contribuições:</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.tagContainer}>
              {tags({content: "Contribuição 1"})}
              {tags({content: "Contribuição 1"})}
              {tags({content: "Contribuição 1"})}
              {tags({content: "Contribuição 1"})}

            </View>
          </ScrollView>

          <Text style={styles.sectionTitle}>Expertise:</Text>
          <View style={styles.tagContainer}></View>

          <Text style={styles.sectionTitle}>Cargo atual:</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.tagContainer}>
            {tags({content: "Contribuição 1"})}
            {tags({content: "Contribuição 1"})}
            {tags({content: "Contribuição 1"})}

            </View>
          </ScrollView>

          <Text style={styles.quote}>
            "A persistência é o caminho do êxito."
          </Text>
        </View>

        <Text style={styles.socialTitle}>
          Encontre ele nas redes sociais abaixo:
        </Text>
        <View style={styles.socialIcons}></View>
        <CustomNavagation disablePress={true} trendingItems={[{name: 'Palestrante', path: '/home/speaker',}, {name: 'Propósito', path: '/home/lecturesObjective'} , {name: 'Público alvo', path: '/home/targetPublicLectures'}]}/>

      </View>
    </ScrollView>
  )
}

const tags = ({ content }) => {
  return (
      <View style={styles.tag}>
      <Text style={styles.tagText}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#003B73",
  },
  ButtonIcon: {
    position: 'relative',
    top: 40,
    left: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    padding: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  description: {
    color: "white",
    fontSize: 14,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  tagContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    backgroundColor: "#003B73",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: "white",
    fontSize: 14,
  },
  quote: {
    color: "white",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 15,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003B73",
    marginTop: 20,
    textAlign: "center",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 15,
  },
  background: {
    width: "100%",
    height: 300,
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 10,
  },
})

export default Speaker
