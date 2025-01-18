import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper';

const Checked = ({isChecked, onPress}) => {
  return (
    <View style={styles.screen}>
       <Checkbox.Item label="I agree to terms and conditions" status={isChecked ? 'checked' : 'unchecked'} onPress={onPress} position='leading'/>
    </View>
  )
}

export default Checked

const styles = StyleSheet.create({
    screen: {
        marginVertical: 8,
    }
})