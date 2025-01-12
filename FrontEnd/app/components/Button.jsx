import { View, Text } from 'react-native'
import React from 'react'


const Button = ({title, handlePress}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default Button