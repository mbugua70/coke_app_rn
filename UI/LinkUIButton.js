import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const LinkUIButton = ({onPress, children}) => {
  return (
    <Pressable onPress={onPress}>
         <Text style={styles.textColor}>{children}</Text>
    </Pressable>
  )
}

export default LinkUIButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },

    textColor: {
        color: "blue"
    }
})