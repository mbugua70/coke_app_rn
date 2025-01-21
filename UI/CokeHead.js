import { useFonts } from 'expo-font';
import { Text, StyleSheet } from 'react-native';

const CocaColaTitle = ({size}) => {
  const [fontsLoaded] = useFonts({
    'Coca-Cola': require('../assets/fonts/cocacola.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Render nothing or a fallback UI until the font is loaded
  }

  return <Text style={[styles.title, {fontSize: size}, {fontFamily: 'Coca-Cola',}]}>CocaCola</Text>;
};

const styles = StyleSheet.create({
  title: {
    // padding: 12,
    paddingHorizontal: 6,
    color: 'red',
  },
});

export default CocaColaTitle;
