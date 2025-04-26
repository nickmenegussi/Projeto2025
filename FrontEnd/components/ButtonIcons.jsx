import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonIcons = ({color, size, Icon, handleChange}) => {
  return (
    <View>
      <TouchableOpacity onPress={handleChange}>
        <Icon color={color} size={size} />
      </TouchableOpacity>
    </View>
  )
}

export default ButtonIcons