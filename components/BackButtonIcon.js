import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../Constants/Globalcolors";
import { useNavigation } from "@react-navigation/native";

const BackButtonIcon = ({ tintColor }) => {
  const navigation = useNavigation();
  function handleBackButton() {
    navigation.goBack();
  }
  return (
    <View style={styles.screen}>
      <Pressable onPress={handleBackButton} style={styles.buttonContainer}>
        <Ionicons name="close" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

export default BackButtonIcon;

const styles = StyleSheet.create({
  screen: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: GlobalStyles.colors.primary800,
  },

  buttonContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
