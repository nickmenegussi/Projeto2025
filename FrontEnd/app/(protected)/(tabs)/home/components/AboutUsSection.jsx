import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import styles from "../styles/homeStyles";

const AboutUsSection = ({ objetivos }) => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Saiba mais sobre Nossa Casa Espírita</Text>
    {objetivos.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        activeOpacity={0.6}
        onPress={() => item.navigation ? router.push(item.navigation) : Alert.alert("Conteúdo ainda não definido")}
      >
        <Image source={item.icon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default AboutUsSection;
