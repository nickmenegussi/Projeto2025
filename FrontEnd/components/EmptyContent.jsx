import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const EmptyContent = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/Search.png')} resizeMode='contain'/>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.Subtitle} >{subtitle}</Text>
    </View>
  )
}

export default EmptyContent

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 500
    },
    title: {
      color: 'white',
      fontSize: 17,
    },
    Subtitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    }
})