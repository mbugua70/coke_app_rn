import { View, Text, Pressable, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '../Constants/Globalcolors';




const SecondaryButton = ({onPress,children, icon}) => {
  return (
       <Pressable style={({pressed})=> pressed ? [styles.buttons, styles.pressed] : styles.buttons} onPress={onPress}>
          <Ionicons style={styles.icon} name={icon} size={18} color={GlobalStyles.colors.primary800} />
          <Text style={styles.buttonText}>{children}</Text>
       </Pressable>
  )
}

export default SecondaryButton;

const styles = StyleSheet.create({
  buttons:{
    borderColor: GlobalStyles.colors.primary800,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },

  icon: {
    marginHorizontal: 5,
  },

  buttonText: {
    color: GlobalStyles.colors.primary800,
  },

  pressed: {
    opacity: 0.75
  }
})