import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonIcons = ({color, size, fill = false, Icon, handleChange}) => {
  return (
    <View>
      <TouchableOpacity onPress={handleChange}>
        <Icon color={color} size={size} fill={fill}/>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonIcons