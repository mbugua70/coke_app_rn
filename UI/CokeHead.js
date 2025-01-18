import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const CocaColaTitle = ({size}) => {
  const [fontsLoaded] = useFonts({
    'CocaCola': require('../assets/fonts/cocacola.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Render nothing or a fallback UI until the font is loaded
  }

  return <Text style={[styles.title, {fontSize: size}]}>C</Text>;
};

const styles = StyleSheet.create({
  title: {
    // padding: 12,
    fontFamily: 'CocaCola',
    color: 'red',
  },
});

export default CocaColaTitle;
