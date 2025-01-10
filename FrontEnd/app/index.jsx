import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// Use require para importar imagens estáticas
const logo = require('../assets/images/Logo.png')

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          {/* Use a variável logo diretamente */}
          <Image source={logo} className="" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
