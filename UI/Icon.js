import {View, Text, StyleSheet, Pressable} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const IconButton = ({name, size, color}) => {
    const navigation = useNavigation();
    function handlePressHandler(){
     navigation.navigate("Profile");
    }

    return(
        <>
         <View style={styles.icon}>
          <Pressable hitSlop={20} onPress={handlePressHandler} style={({pressed}) => pressed ? [styles.pressed, styles.button]: styles.button}>
             <Ionicons name={name} size={size} color={color} />
          </Pressable>
        </View>
        </>
    )
}


export default IconButton;

const styles = StyleSheet.create({
    icon: {
       overflow: "hidden",
    },

    button: {
        justifyContent: "center",
        alignContent: "center",
        padding: 12,
    },
    pressed: {
        opacity: 0.75,
    }
})