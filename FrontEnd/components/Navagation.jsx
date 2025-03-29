import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Trending = ({navagations, path}) => {
  return (
      <FlatList style={styles.FlatListContainer}
        data={navagations}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
        <TouchableOpacity style={styles.CardNavagation} onPress={() => router.navigate({pathname: item.path, params: item.data})} activeOpacity={0.6}>
          <Text style={styles.TextContent}>{item.name}</Text>
        </TouchableOpacity>
    )}
        horizontal
        contentContainerStyle={styles.FlatListContainer}

      />
      
  )
}

export default Trending

const styles = StyleSheet.create({
    FlatListContainer: {
      paddingVertical: 15
    },
    ContentFlatList: {
        color: 'white'
    } , CardNavagation : {
      display: 'flex',
      backgroundColor: '#60A3D9',
      minWidth: '10%',
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10
    }, TextContent: {
      color: 'white',
      textAlign: 'center',
      paddingHorizontal: 10
    }
    
})