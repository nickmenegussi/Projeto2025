import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const VolunteerWork = () => {
  return (
    <SafeAreaView style={styles.ContainerSafeAreaView}>
      <ScrollView>
        <View>
          <ImageBackground source={require('../../../assets/images/Jesus-Cristo.png')}
          imageStyle={styles.imageStyle}
          style={styles.background} // aplica estilização ao conteudo externo
          >
            <View>
              <TouchableOpacity>
                
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VolunteerWork

const styles = StyleSheet.create({
  ContainerSafeAreaView: {
    flex: 1,
    backgroundColor: '#003B73'
  }, Text: {
    color: 'white'
  }, imageStyle: {
    resizeMode:'cover',
    borderRadius: 10,
  }, background: {
    width: '100%',
    height: 300
  }
})