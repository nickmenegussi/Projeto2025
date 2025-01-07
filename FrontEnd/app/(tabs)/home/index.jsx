import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/home/lectures">Palestras da casa</Link>
    </View>
  )
}

export default Home