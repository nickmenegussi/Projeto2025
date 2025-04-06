import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'lucide-react-native'

const LecturesObjective = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>
        <ImageBackground imageStyle={styles.imageStyle} style={styles.BackGround} source={require("../../../assets/images/Jesus-Cristo.png")}>
          <View>
            <TouchableOpacity style={styles.ButtonIcon} onPress={() => router.navigate('/home/lectures')}>
              <ArrowLeftIcon color='black' size={40} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Objetivos da Palestra</Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            O objetivo da palestra é compartilhar informações e conhecimentos sobre temas relevantes e atuais, promovendo a reflexão e o debate entre os participantes.
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            A palestra visa também estimular o interesse pela pesquisa e pelo aprendizado contínuo, contribuindo para o desenvolvimento pessoal e profissional dos participantes.
          </Text>
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
  }
})