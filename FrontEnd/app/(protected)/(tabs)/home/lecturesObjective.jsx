import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ArrowLeftIcon } from 'lucide-react-native'
import { router, useLocalSearchParams } from 'expo-router'
import CustomNavagation from "../../../../components/CustomNavagation"

const LecturesObjective = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>
        <ImageBackground imageStyle={styles.imageStyle} style={styles.BackGround} source={require("../../../../assets/images/Jesus-Cristo.png")}>
          <View>
            <TouchableOpacity style={styles.ButtonIcon} onPress={() =>
              router.back('/home/aboutLecture')
            }>
              <ArrowLeftIcon color='black' size={40} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.containerContent}>
          <Text style={styles.textContent}>Qual é o objetivo das palestras Espíritas?</Text>
            <View>
              <View style={styles.lineNavagation}></View>
              <CustomNavagation trendingItems={[{name: 'Objetivo 1'}, {name: 'Objetivo 2'}, {name: 'Objetivo 3'}]} normalPress={false} sendData={false} otherStyles={true} />
            </View>
            <View>
              <Image style={styles.ImageContent} source={require('../../../../assets/images/foto.png')} />
            </View>      
            <View style={styles.line}></View>
            <View>
              <Text style={styles.textContent}>A palestra</Text>
            </View>
            <View style={styles.line}></View>
            <View>
              <Text style={styles.SmalltextContent}>O objetivo das palestras Espíritas é proporcionar um espaço de reflexão e aprendizado sobre os princípios da doutrina Espírita, promovendo o desenvolvimento moral e espiritual dos participantes.</Text>
            </View>
            <View style={styles.line}></View>
            <View style={{marginTop: 20}}>
              <CustomNavagation sendData={true} normalPress={false} trendingItems={[{name: 'Palestrante', path: '/home/speaker',}, {name: 'Propósito', path: '/home/lecturesObjective'} , {name: 'Público alvo', path: '/home/targetPublicLectures'}]}/>
            </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default LecturesObjective

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#003B73',
  }, ButtonIcon: {
    position: 'relative',
    top: 40,
    left: 20
  }, BackGround: {
    width: '100%',
    height: 300
  }, imageStyle: {
    resizeMode: 'cover',
    borderRadius: 10
  }, ImageContent: {
    height: 200,
    width: '100%'
  }, line: {
    width: '100%',
    borderWidth: 0.6,
    borderColor: 'white'
  }, containerContent: {
    padding: 20,
    flex: 1,
    gap: 20
  }, textContent: {
    fontSize: 20,
    color: 'white'
  }, SmalltextContent: {
    color: 'white',
    fontWeight: 'regular',
    fontSize: 17,
  }, lineNavagation: {
    width: '100%',
    borderColor: 'white',
    borderWidth: 0.6,
    position: 'absolute',
    top: 1,
  }
})