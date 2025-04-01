import { View, Text, ImageBackground, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeftIcon, MapIcon, TimerIcon, X } from 'lucide-react-native'
import { router, useLocalSearchParams } from 'expo-router'

const AboutLecture = () => {
  const params = useLocalSearchParams()
  const data = params.data ? JSON.parse(decodeURIComponent(params.data)) : {}
  const [lecture, setLecture] = useState([data])
  console.log(lecture)
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.scrollContainer}>
      <View>
        <ImageBackground 
          imageStyle={styles.imageStyle} 
          style={styles.background} 
          source={require('../../../assets/images/Jesus-Cristo.png')}
        >
          <View>
            <TouchableOpacity style={styles.ButtonIcon} onPress={() => router.navigate('/home')}>
              <ArrowLeftIcon color='black' size={40} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.ContainerContent}>
          <Text style={styles.textContentContainer}>Detalhes da Palestra</Text>
          {lecture && (
            <View style={styles.ContainerIcons}>
              <View style={styles.contentIcons}>
                <MapIcon size={25} color={'white'} />
                <Text>{lecture.nameLecture}</Text>
              </View>
              {lecture.dateLecture}(
                <View style={styles.contentIcons}>
                  <TimerIcon size={25} color={'white'} />
                  <Text>Date: {lecture[0].dateLecture}</Text>
              </View>
              )
          </View>
          )} 
          
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutLecture

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#003B73',
  },
  scrollContainer: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: 300,
  },
  imageStyle: {
    resizeMode: 'cover',
    borderRadius: 10

  },
  text: {
    color: 'white',
    fontSize: 18,
    padding: 10,
  }, ButtonIcon: {
    position: 'relative',
    top: 40,
    left: 20
  }, ContainerContent: {
    flex: 1,
    gap: 20,
    padding: 20
  }, textContentContainer: {
    fontSize: 20,
    color: 'white'
  }, ContainerIcons: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
  }, contentIcons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
})
