import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../Constants/Globalcolors'
import { useFonts } from 'expo-font'

const UserName = ({name, phone}) => {
    const [fontsLoaded] = useFonts({
        'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf')
    })

    // checking if fonts has loaded
    if(!fontsLoaded){
        return null
    }

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text2}>{phone}</Text>
    </View>
  )
}

export default UserName

const styles = StyleSheet.create({
    screen: {
     marginTop: 10,
     justifyContent: "center",
     alignContent: "center",
    },
    text: {
        fontWeight: "bold",
        textAlign: "center",
        color: GlobalStyles.colors.gray800,
        fontSize: 20,
    },
    text2: {
        textAlign: "center",
        color: GlobalStyles.colors.gray500,
        fontSize: 16,
        fontFamily: 'Pacifico'
    }
})