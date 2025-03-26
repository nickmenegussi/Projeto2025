import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRouter } from 'expo-router'

const Lectures = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.BackGroundSafeArea}>
      <FlatList 
      data={[{id: 2}, {id: 2}]}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.id}</Text>
          </View>
      )}
      horizontal
      />
    </SafeAreaView>
  )
}

export default Lectures

const styles = StyleSheet.create({
  BackGroundSafeArea: {
    backgroundColor: '#003B73',
    flex: 1
  }, itemContainer: {

  }, itemText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',

  }
})