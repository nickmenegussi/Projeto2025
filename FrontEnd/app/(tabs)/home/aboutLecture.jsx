import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const aboutLecture = () => {
  return (
  
  <ScrollView>
    <ImageBackground imageStyle={styles.imageStyle} style={styles.background} source={require('../../../assets/images/Jesus-Cristo.png')}>
      <View>
      </View>
    </ImageBackground>
    </ScrollView>
  )
}

export default aboutLecture

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  }, imageStyle: {
    width: 700
  }
})