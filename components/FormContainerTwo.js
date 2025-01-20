import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import InputTwo from "./InputTwo";
import FlatButton from "../UI/FlatButton";
import DropdownComponent from "./Dropdown";
import LocationPicker from "./LocationPicker";

const data = {
  ageData: [
    { label: "18-24 years", value: "18-24" },
    { label: "25-34 years", value: "25-34" },
    { label: "35-44 years", value: "35-44" },
    { label: "45-54 years", value: "45-54" },
    { label: "55-64 years", value: "55-64" },
    { label: "65+ years", value: "65+" },
  ],
  sodaData: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ],
  beverage: [
    { label: "Soda", value: "Soda" },
    { label: "Water", value: "Water" },
    { label: "Juice", value: "Juice" },
    { label: "Energy Drink", value: "Energy Drink" },
  ],
  frequency: [
    { label: "Weekly", value: "Weekly" },
    { label: "Daily", value: "Daily" },
    { label: "Yearly", value: "Yearly" },
  ],
  sku: [
    { label: "300ml", value: "300ml" },
    { label: "500ml", value: "500ml" },
    { label: "1L", value: "1L" },
  ],
};

const FormContainerTwo = ({ isLogin, onSubmit, credentialsInvalid, isSubmiting }) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredReason, setEnteredReason] = useState("");
  const [enteredPurchase, setEnteredPurchase] = useState("");
  const [enteredVariant, setEnteredVariant] = useState("");
  const [enteredPricing, setEnteredPricing] = useState("");
  const [enteredFeedback, setEnteredFeedback] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredSoda, setEnteredSoda] = useState("");
  const [enteredBeverage, setEnteredBeverage] = useState("");
  const [enteredFrequency, setEnteredFrequency] = useState("");
  const [enteredSku, setEnteredSku] = useState("");
  const [location, setLocation] = useState("");
  const navigaton = useNavigation();

  const {
    name: nameIsValid,
    phone: phoneIsInvalid,
    beverage: beverageIsInvalid,
    age: ageIsInvalid,
    soda: sodaIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setEnteredName(enteredValue);
        break;
      case "phone":
        setEnteredPhone(enteredValue);
        break;
      case "reason":
        setEnteredReason(enteredValue);
        break;
      case "purchase":
        setEnteredPurchase(enteredValue);
        break;
      case "variant":
        setEnteredVariant(enteredValue);
        break;
      case "pricing":
        setEnteredPricing(enteredValue);
        break;
      case "feedback":
        setEnteredFeedback(enteredValue);
        break;
      case "age":
        setEnteredAge(enteredValue);
        break;
      case "soda":
        setEnteredSoda(enteredValue);
        break;
      case "beverage":
        setEnteredBeverage(enteredValue);
        break;
      case "frequency":
        setEnteredFrequency(enteredValue);
        break;
      case "sku":
        setEnteredSku(enteredValue);
        break;
    }
  }

  function takeLocationHandler(pickedlocation) {
    console.log("the pickedloc 2");
    setLocation(pickedlocation);
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      phone: enteredPhone,
      soda: enteredSoda,
      reason: enteredReason,
      beverage: enteredBeverage,
      age: enteredAge,
      soda: enteredSoda,
      frequency: enteredFrequency,
      purchase: enteredPurchase,
      variant: enteredVariant,
      sku: enteredSku,
      pricing: enteredPricing,
      feedback: enteredFeedback,
      lat: location.lat,
      long: location.long,
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'>
          <InputTwo
            label='Name'
            onUpdateValue={updateInputValueHandler.bind(this, "name")}
            value={enteredName}
            isInvalid={nameIsValid}
            placeholder='Enter name'
          />

          <InputTwo
            label='Phone Number'
            onUpdateValue={updateInputValueHandler.bind(this, "phone")}
            value={enteredPhone}
            isInvalid={phoneIsInvalid}
            placeholder='Enter phone number'
            keyboardType="numeric"
          />

          <DropdownComponent
            isInvalid={ageIsInvalid}
            label='Age'
            data={data.ageData}
            onUpdateValue={updateInputValueHandler.bind(this, "age")}
          />

          {/* soda */}
          <DropdownComponent
            isInvalid={sodaIsInvalid}
            label='Do you take soda'
            data={data.sodaData}
            onUpdateValue={updateInputValueHandler.bind(this, "soda")}
          />

          {/* beverage */}
          <DropdownComponent
            isInvalid={beverageIsInvalid}
            label='Choice of beverage'
            data={data.beverage}
            onUpdateValue={updateInputValueHandler.bind(this, "beverage")}
          />

          <InputTwo
            label='Reasons'
            onUpdateValue={updateInputValueHandler.bind(this, "reason")}
            value={enteredReason}
            placeholder='Enter reasons'
          />

          {/* frequency */}
          <DropdownComponent
            label='Frequency'
            data={data.frequency}
            onUpdateValue={updateInputValueHandler.bind(this, "frequency")}
          />

          <InputTwo
            label='Point of purchase'
            onUpdateValue={updateInputValueHandler.bind(this, "purchase")}
            value={enteredPurchase}
            placeholder='Enter point of purchase'
          />

          <InputTwo
            label='Variant'
            onUpdateValue={updateInputValueHandler.bind(this, "variant")}
            value={enteredVariant}
            placeholder='Enter variant'
          />

          {/* SKU */}
          <DropdownComponent
            label='SKU'
            data={data.sku}
            onUpdateValue={updateInputValueHandler.bind(this, "sku")}
          />

          <InputTwo
            label='Pricing'
            onUpdateValue={updateInputValueHandler.bind(this, "pricing")}
            value={enteredPricing}
            placeholder='Enter pricing'
          />

          <InputTwo
            label='Feedback'
            onUpdateValue={updateInputValueHandler.bind(this, "feedback")}
            value={enteredFeedback}
            placeholder='Enter feedback'
          />

          {/* location functionality */}
          <LocationPicker onLocationHandler={takeLocationHandler} />

          {/* button content */}
          <View style={styles.submitContainer}>
            {isSubmiting ? <ActivityIndicator animating={true} color={MD2Colors.lightBlueA700} size="small"/> :  <FlatButton isSubmiting={isSubmiting} onPress={submitHandler}>SUBMIT</FlatButton>}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FormContainerTwo;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 20,
    flexGrow: 1,
  },

  submitContainer: {
    marginTop: 20,
    marginBottom: 0,
  },
});
