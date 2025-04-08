import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

export default function ReviewSociety() {
  return (
    <ScrollView style={styles.BackGroundSafeArea}>
        <View>
            <Text>Olá, mundo!</Text>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    BackGroundSafeArea: {
        flex: 1,
        backgroundColor: '#003B73'
    }
})