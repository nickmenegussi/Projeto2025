import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'

const Lectures = () => {
  const params = useLocalSearchParams()
  const lectures = params.data ? params.data : []
  console.log('ola')
  console.log(lectures)

  return (
    <SafeAreaView style={styles.BackGroundSafeArea}>
      <FlatList 
      // data={lectures}
      keyExtractor={(item) => item.idLecture}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.idLecture}</Text>
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