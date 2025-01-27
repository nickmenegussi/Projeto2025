import { View, Text, Image } from 'react-native'
import React from 'react'

const EmptyContent = ({title, subtitle}) => {
  return (
    <View>
        <Image source={require('../assets/images/Search.png')} />
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
    </View>
  )
}

export default EmptyContent