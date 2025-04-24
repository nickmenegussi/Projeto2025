import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {ArrowLeft, ArrowRight, Eye, EyeOff, } from 'lucide-react-native'

const FormField = ({title, value, placeholder ,handleChangeText, othersStyles ,...props}) => {
  // ...props é para utilizar propriedades extra sem precisar escrever
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View style={[style.container, ]}>
      <Text style={style.titleForms}>{title}</Text>
      <View style={[style.containerForms,othersStyles]} >
        <TextInput style={[style.textoInput, props.textInputSmall]}  value={value} onChangeText={handleChangeText} placeholder={placeholder} keyboardType={props.keyboardType || "default"} secureTextEntry={title === 'Password' && !showPassword}/>
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={style.hideAndShow} >
              {showPassword ? <Eye color='black' size={19} /> : <EyeOff color='black' size={19} />}
          </TouchableOpacity>
        )}
        {title === 'Avaliar o Centro Espírita' && (
          <TouchableOpacity onChangeText={handleChangeText} style={props.IconStyle} >
          <ArrowRight color={'black'} size={30} /> 
      </TouchableOpacity>
        )
        
        }
      </View>
    </View>
  )
}

export default FormField

const style = StyleSheet.create({
  container: {
    marginTop: 10
  },
  titleForms: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  textoInput: {
    marginLeft: 10,
    flex: 1
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