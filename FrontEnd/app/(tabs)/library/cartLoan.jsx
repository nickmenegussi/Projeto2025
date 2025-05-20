import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function cartLoan() {
   const params = useLocalSearchParams();
    const cartItems = params.data ? JSON.parse(decodeURIComponent(params.data)) : [];
console.log('params:', params);
  return (
    <View>
      {cartItems.map((item, index) => (
        <View key={index}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>  
            <Text>{item.quantity}</Text>
            <Text>{item.total}</Text>
        </View>
      ))}
    </View>
  )
}