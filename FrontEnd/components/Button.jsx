import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


const Button = ({title, textStyles ,buttonStyle,handlePress, othersStyles, opacityNumber}) => {
  return (
    <View style={[styles.container, othersStyles]}>
      <TouchableOpacity style={[styles.button, buttonStyle]} activeOpacity={opacityNumber} onPress={handlePress}>
        <Text style={[styles.textButton, textStyles]}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  textButton: {
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 360 ,
    maxWidth: 370 ,
    backgroundColor: "#60A3D9",
    borderRadius: 10,
    marginTop: 20
  },
})