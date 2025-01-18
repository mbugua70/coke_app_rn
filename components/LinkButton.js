import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'
import LinkUIButton from '../UI/LinkUIButton'

const LinkButton = ({isLogin, onPress}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.screenFlex}>
      <Text style={styles.text}>{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
      <LinkUIButton onPress={onPress}>{isLogin ? 'Create Now' : 'Sign In'}</LinkUIButton>
      </View>
    </View>
  )
}

export default LinkButton

const styles = StyleSheet.create({
    screen:{
      paddingVertical: 4,
      marginVertical: 8,
    },
  screenFlex: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center"
  },

  text: {
    fontSize: 16,
  },


})