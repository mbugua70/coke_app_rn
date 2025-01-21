import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'

const HeadComp = () => {
  return (
    <View style={styles.imageContainer}>
       <Image source={require("../assets/image/coke.png")}  style={styles.image} />
    </View>
  )
}

export default HeadComp

const styles = StyleSheet.create({
    imageContainer: {
        width: 250,
        height: 100,
        marginTop: 20,
    },
    image: {
        width: "100%",
        height: "100%",
    }
})