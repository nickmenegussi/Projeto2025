import { View, Text, ImageBackground, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, MapIcon } from 'lucide-react-native'
import { router, useLocalSearchParams } from 'expo-router'
import EmptyContent from "../../../../components/EmptyContent";
import VideoUrl from '../../../../components/VideoUrl';
import CustomNavagation from '../../../../components/CustomNavagation';

const AboutLecture = () => {
  const params = useLocalSearchParams()
  const data = params.data ? JSON.parse(decodeURIComponent(params.data)) : {}
  const [lecture, setLecture] = useState([data])

  function ConvertDateTimeTo(datetime){
    const date = new Date(datetime)
    const month = String(date.getMonth() + 1).padStart(2, '0') // padStart para falar o máximo de algarismo que eu ou querer e '0' por padrão.
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)

    return `${day}/${month}/${year}`
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.scrollContainer}>
      <View>
        <ImageBackground 
          imageStyle={styles.imageStyle} 
          style={styles.background} 
          source={require('../../../../assets/images/Jesus-Cristo.png')}
        >
          <View>
            <TouchableOpacity style={styles.ButtonIcon} onPress={() => {
              router.back()
            }}>
              <ArrowLeftIcon color='black' size={40} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.ContainerContent}>
          <Text style={styles.textContentContainer}>Detalhes da Palestra</Text>
          <View style={styles.line}></View>
          {lecture.length > 0 ? (
            <View style={styles.ContainerIcons}>
              <View style={styles.contentIcons}>
                <MapIcon size={25} color={'white'} />
                <Text style={styles.SmallTextContentIcons}>R. Coração de Maria, 341 - Centro, Esteio - RS,</Text>
              </View>
              <View style={styles.contentIcons}>
                  <CalendarIcon size={25} color={'white'} />
                  <Text style={styles.TextContentIcons}>Data: {ConvertDateTimeTo(lecture[0].dateLecture) ? ConvertDateTimeTo(lecture[0].dateLecture) : <Text>Nenhum Conteudo encontrado</Text>}</Text>
              </View>
              <View style={styles.contentIcons}>
                  <ClockIcon size={25} color={'white'} />
                  <Text style={styles.TextContentIcons}>Hora: {lecture[0].timeLecture}</Text>
              </View>
              <View style={styles.line}></View>
              <Text style={styles.textChapter}>Capítulo I: {lecture[0].nameLecture}</Text>
          </View>
          ) : (
            <EmptyContent title={'Nenhum conteúdo Encontrado!'} />
          )} 
          <View style={styles.line}></View>
          <VideoUrl videoUrl={lecture[0].link_url ? lecture[0].link_url : ''}/>
          <CustomNavagation normalPress={true} sendData={true} trendingItems={[{name: 'Palestrante', path: '/home/speaker',}, {name: 'Propósito', path: '/home/lecturesObjective', data: lecture} , {name: 'Público alvo', path: '/home/targetPublicLectures', data: lecture}]} otherStyles={false}/>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutLecture

const styles = StyleSheet.create({
  safeContainer: {
    paddingBottom: 100,
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
  }, TextContentIcons: {
    color: 'white',
  },
  SmallTextContentIcons: {
    color: 'white',
    maxWidth: 280,
  }, line: {
    width: '100%',
    borderWidth: 0.6,
    borderColor: 'white'
  }, textChapter: {
    fontSize: 16,
    color: 'white'
  }
    
})
