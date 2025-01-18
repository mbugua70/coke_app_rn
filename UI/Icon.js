import {View, Text, StyleSheet} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const IconButton = ({name, size, color}) => {
    return(
        <>
         <View style={styles.icon}>
         <Ionicons name={name} size={size} color={color} />
        </View>
        </>
    )
}


export default IconButton;

const styles = StyleSheet.create({
    icon: {
        justifyContent: "center",
        alignContent: "center",
        padding: 12,
    }
})