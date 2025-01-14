import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const Navigation = ({title, handlePress, othersStyles}) => {
  return (
    <View style={styles.Container}>
        <TouchableOpacity onPress={handlePress} style={[styles.ButtonNavigation, othersStyles]}>
            <Text style={styles.TextButton}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Navigation

const styles = StyleSheet.create({
    Container: {
        paddingVertical: 30
    },
    ButtonNavigation: {
        backgroundColor: '#60A3D9',
        width: 140,
        borderRadius: 5,
        height: 30,
        alignItems: ' center',
        justifyContent: 'center'

    },
    TextButton: {
        textAlign: 'center',
        color: 'white'
    },
})