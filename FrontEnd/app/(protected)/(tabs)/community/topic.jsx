import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Topic = () => {
  return (
    <SafeAreaView>
      <View>
        <Image source={{uri: "../../../../assets/images/icon.png"}} />
        <TextInput 
        placeholder='Search'
        /> 
      </View>
    </SafeAreaView>
  )
}

export default Topic