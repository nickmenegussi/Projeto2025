import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {Eye, EyeOff, } from 'lucide-react-native'

const FormField = ({title, value, placeholder ,handleChangeText, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View style={style.container}>
      <Text style={style.titleForms}>{title}</Text>
      <View style={style.containerForms} >
        <TextInput style={style.textoInput} value={value} onChangeText={handleChangeText} placeholder={placeholder}  secureTextEntry={title === 'Password' && !showPassword}/>
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={style.hideAndShow} >
              {showPassword ? <Eye color='black' size={15} /> : <EyeOff color='black' size={19} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const style = StyleSheet.create({
  container: {
    marginTop: 30
  },
  titleForms: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  textoInput: {
    marginLeft: 10
  },
  containerForms: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    maxWidth: 360,
    minWidth: 360,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50
  },
  hideAndShow: {
    padding: 15,
    flexDirection: 'row'
  }
})