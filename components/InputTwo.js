import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { GlobalStyles } from "../Constants/Globalcolors";
import { forwardRef } from "react";

const InputTwo = forwardRef((
  {
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid,
    placeholder,
    onSubmitEditing,
    blurOnSubmit,
    returnKeyType
  }, ref
) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
     <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        // autoCapitalize={false}
        autoCapitalize='none'
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        ref={ref}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
      />

    </View>
  );
});

export default InputTwo;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "black",
    marginBottom: 4,
  },
  labelInvalid: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
    fontSize: 16,
    borderColor: GlobalStyles.colors.gray700,
    borderWidth: 1,
  },
  inputInvalid: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
