import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'

const ForgotButton = () => {
  return (
    <View style={styles.screen}>
        <Link screen="forgotPassword" style={styles.textLink}>Forgot Password?</Link>
    </View>
  )
}

export default ForgotButton

const styles = StyleSheet.create({
    screen: {
        marginVertical: 6,
        paddingVertical: 6,
        paddingHorizontal: 4,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    textLink: {
        fontSize: 14,
        fontWeight: '400'
    }
})