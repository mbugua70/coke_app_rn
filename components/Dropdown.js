import React, { forwardRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { GlobalStyles } from "../Constants/Globalcolors";

const DropdownComponent = forwardRef(({
  data,
  label,
  isInvalid,
  onUpdateValue,
  value,
  onSubmitEditing,
  blurOnSubmit,
  returnKeyType
}, ref) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "blue" },
          isInvalid && { borderColor: GlobalStyles.colors.error500 },
          isInvalid && styles.selectError,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select answer" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onUpdateValue(item.value);
          setIsFocus(false);
        }}
        ref={ref}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        returnKeyType={returnKeyType}
      />
    </View>
  );
});

export default DropdownComponent;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },

  dropdown: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
    fontSize: 16,
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  label: {
    color: "black",
    marginBottom: 4,
  },
  labelInvalid: {
    color: GlobalStyles.colors.error500,
  },
  selectError: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
