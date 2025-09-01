import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from 'react-native'
import { ArrowLeftIcon, MapIcon } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import EmptyContent from "../../../../components/EmptyContent";
import Button from "../../../../components/Button"

const VolunteerWork = () => {
  const params = useLocalSearchParams();
  const data = params.data ? JSON.parse(params.data) : {};
  const [volunteerWork, seVolunteerWork] = useState([data]);

  return (
    <SafeAreaView style={styles.ContainerSafeAreaView}>
      <ScrollView>
        <View>
          <ImageBackground
            source={require("../../../../assets/images/Jesus-Cristo.png")}
            imageStyle={styles.imageStyle}
            style={styles.background}
          >
            <View>
              <TouchableOpacity
                style={styles.ButtonIcon}
                onPress={() => router.back("/home")}
              >
                <ArrowLeftIcon size={48} color="black" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.ContainerContent}>
          {volunteerWork.length > 0 ? (
            volunteerWork.map((item) => (
              <View key={item.idVolunteerWork}>
                <Text style={styles.Text}>
                  {item.nameVolunteerWork ? (
                    item.nameVolunteerWork
                  ) : (
                    <Text>Informação não fornecida.</Text>
                  )}
                </Text>

                <View style={styles.line}></View>
                <View style={styles.cardContainer}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.title}>
                      Sociedade Espírita{"\n"}Gabriel Delanne
                    </Text>
                    <View style={styles.iconRow}>
                      <MapIcon color="white" size={21} />
                      <Text style={styles.infoText}>
                        R. Coração de Maria,{"\n"}341 - Centro, Esteio, RS
                      </Text>
                    </View>
                  </View>

                  <View style={styles.verticalDivider} />

                  <View style={styles.rightColumn}>
                    <View style={styles.iconRow}>
                      <Text style={styles.icon}>📅</Text>
                      <Text style={styles.infoText}>
                        Todas as{"\n"}Terças-feiras
                      </Text>
                    </View>
                    <View style={styles.iconRow}>
                      <Text style={styles.icon}>🕒</Text>
                      <Text style={styles.infoText}>14:00 – 16:30</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.line}></View>

                <View style={styles.contentBottom}>
                  <Text style={styles.TextContent}>
                    Tipo de Trabalho: Voluntário
                  </Text>
                  <Text style={styles.TextContent}>Requisito: Voluntário</Text>
                  {item.work_description ? (
                    <Text style={styles.TextContent}>{item.work_description}</Text>
                  ) : (
                    <Text style={styles.TextContent}>Ainda não há detalhes cadastrados sobre esta atividade.</Text>
                  )}
                  <Button title={'Participar'} opacityNumber={0.5} handlePress={() => {item.work_description  && item.nameVolunteerWork ? router.push('https://docs.google.com/forms/d/e/1FAIpQLSfzfjsRZFl6KOVuafOdrO0YK9gh_XIkKuP-DRtECyxTMxBdVA/viewform?usp=sharing'): Alert.alert('Navegação Indisponível')}} />

                </View>
              </View>
            ))
          ) : (
            <EmptyContent title="Oops! Nada por aqui..."
            subtitle="Estamos atualizando as informações. Fique ligado para novidades em breve." />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VolunteerWork;

const styles = StyleSheet.create({
  ContainerSafeAreaView: {
    flex: 1,
    backgroundColor: "#003B73",
  },
  Text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 10,
  },
  background: {
    width: "100%",
    height: 300,
  },
  ButtonIcon: {
    position: "relative",
    top: 40,
    left: 10,
  },
  ContainerContent: {
    padding: 20,
    flex: 1,
    gap: 10,
  },
  cardContainer: {
    flexDirection: "row",
  },
  leftColumn: {
    flex: 1,
    paddingRight: 25,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  infoText: {
    color: "white",
    fontSize: 13,
  },
  icon: {
    color: "white",
    fontSize: 16,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  TextContent: {
    fontSize: 15,
    color: "white",
  },
  contentBottom: {
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
  line: {
    borderWidth: 0.6,
    borderColor: "white",
    marginVertical: 10,
  }, ButtonContentBottom: {
    height: '100%',
    width: '100%'
  }
});
