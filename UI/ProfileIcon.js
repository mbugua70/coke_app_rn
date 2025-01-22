import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';


const ProfileIconUI = ({onPress, color, name, size, text, bg}) => {
  return (
    <View style={styles.screen}>
      <Pressable hitSlop={20} onPress={onPress} style={({pressed}) => [{...styles.button}, pressed && styles.pressed]}>
          <View style={styles.textIcon}>
          <View style={[styles.icon, {backgroundColor: bg}]}>
         <Ionicons name={name} size={size} color={color} />
       </View>
       <Text style={styles.text}>{text}</Text>
          </View>
       <View>
       <Ionicons name="chevron-forward" size={24} color="black" />
       </View>
      </Pressable>
    </View>
  )
}

export default ProfileIconUI

const styles = StyleSheet.create({
    screen: {
      width: "100%",
      marginVertical: 2,
    },

    textIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    button: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    pressed: {
        opacity: 0.25,

    },

    icon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 12,
    }

})