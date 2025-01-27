import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

const Trending = ({posts}) => {
  return (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
        <Text style={styles.ContentFlatList}>{item.id}</Text>
    )}
        horizontal
        
      />
      
  )
}

export default Trending

const styles = StyleSheet.create({
    ContentFlatList: {
        color: 'white'
    }
})