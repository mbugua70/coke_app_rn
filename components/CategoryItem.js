import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Platform,
  } from "react-native";

  const CategoryItem = ({ onNavigate, title, color}) => {
    return (
      <View style={styles.gridNavItem}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.buttonContainer,
            pressed ? styles.pressedButton : null,
          ]}
          onPress={onNavigate}
        >
          <View style={[styles.innerGridContainer, {backgroundColor: color}]}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  export default CategoryItem;

  const styles = StyleSheet.create({
    gridNavItem: {
      // flex: 1,
      marginTop: 10,
      marginHorizontal: 18,
      height: 150,
      borderRadius: 8,
      elevation: 8,
      shadowRadius: 8,
      shadowColor: "#fff",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      overflow: Platform.OS === "android" ? "hidden" : "visible",
    },

    buttonContainer: {
      flex: 1,
      height: "100%",
    },
    pressedButton: {
      opacity: 0.75,
    },

    innerGridContainer: {
      fllex: 1,
      height: "100%",
      padding: 16,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },

    title: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",
    },
  });
