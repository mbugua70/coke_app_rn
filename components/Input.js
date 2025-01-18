import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

const Input = ({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    icon,
    isInvalid,}) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.screencontainer}>
      <TextInput
      style={{borderRadius: 30}}
      mode='outlined'
      error={isInvalid}
      secure={secure}
      keyboardType={keyboardType}
      label={label}
      value={value}
      left={<TextInput.Icon icon={icon} />}
      onChangeText={onUpdateValue}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      theme={{
        roundness: !isFocused ? 20 : 8
      }}
    />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  screencontainer: {
    marginVertical: 8,
  }
})