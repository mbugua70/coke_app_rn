import {StyleSheet, Text, View, Pressable} from "react-native";
import React, { Children, useState } from "react";




const FlatButton = ({children, onPress}) => {
    const [isPressed, setIspressed] = useState(false);


    return(
      <View style={[styles.screen, isPressed && styles.pressed]}>
         <Pressable onPress={onPress} style={styles.button}>
             <Text style={styles.textButton}>{children}</Text>
         </Pressable>
      </View>
    )
}

export default FlatButton;

const styles = StyleSheet.create({
    screen: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: "#d42030",
        paddingVertical: 16,
    },

    textButton: {
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },

    pressed: {
        opacity: 0.75
    }

})