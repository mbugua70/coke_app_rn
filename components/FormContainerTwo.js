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
import React, { useEffect, useState, useRef } from "react";

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

const FormContainerTwo = ({ isLogin, onSubmit, credentialsInvalid, isSubmiting, resetForm}) => {
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

  // userRefs for input fields to be used in the form
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const inputRef8 = useRef(null);
  const inputRef9 = useRef(null);
  const inputRef10 = useRef(null);
  const inputRef11 = useRef(null);
  const inputRef12 = useRef(null);



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

  useEffect(() => {
    setEnteredAge("")
    setEnteredBeverage("");
    setEnteredFeedback(""),
    setEnteredFrequency(""),
    setEnteredName("");
    setEnteredPhone("");
    setEnteredPricing("");
    setEnteredPurchase("");
    setEnteredReason("");
    setEnteredSku("");
    setEnteredSoda("");
    setEnteredVariant("");
   }, [resetForm])


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
            ref={inputRef1}
            onSubmitEditing={() => inputRef1.current?.focus()}
            blurOnSubmit={false}

          />

          <InputTwo
            label='Phone Number'
            ref={inputRef2}
            onUpdateValue={updateInputValueHandler.bind(this, "phone")}
            value={enteredPhone}
            isInvalid={phoneIsInvalid}
            placeholder='Enter phone number'
            keyboardType="numeric"
            onSubmitEditing={() => inputRef2.current?.focus()}
            blurOnSubmit={false}
          />

          <DropdownComponent
            isInvalid={ageIsInvalid}
            label='Age'
            data={data.ageData}
            value={enteredAge}
            onUpdateValue={updateInputValueHandler.bind(this, "age")}
            ref={inputRef3}
            onSubmitEditing={() => inputRef3.current?.focus()}
            blurOnSubmit={false}
          />

          {/* soda */}
          <DropdownComponent
            isInvalid={sodaIsInvalid}
            label='Do you take soda'
            data={data.sodaData}
            value={enteredSoda}
            onUpdateValue={updateInputValueHandler.bind(this, "soda")}
            ref={inputRef4}
            onSubmitEditing={() => inputRef4.current?.focus()}
            blurOnSubmit={false}
          />

          {/* beverage */}
          <DropdownComponent
            isInvalid={beverageIsInvalid}
            label='Choice of beverage'
            data={data.beverage}
            value={enteredBeverage}
            onUpdateValue={updateInputValueHandler.bind(this, "beverage")}
            ref={inputRef5}
            onSubmitEditing={() => inputRef5.current?.focus()}
            blurOnSubmit={false}
          />

          <InputTwo
            label='Reasons'
            onUpdateValue={updateInputValueHandler.bind(this, "reason")}
            value={enteredReason}
            placeholder='Enter reasons'
            ref={inputRef6}
            onSubmitEditing={() => inputRef6.current?.focus()}
            blurOnSubmit={false}
          />

          {/* frequency */}
          <DropdownComponent
            label='Frequency'
            data={data.frequency}
            value={enteredFrequency}
            onUpdateValue={updateInputValueHandler.bind(this, "frequency")}
            ref={inputRef7}
            onSubmitEditing={() => inputRef7.current?.focus()}
            blurOnSubmit={false}
          />

          <InputTwo
            label='Point of purchase'
            onUpdateValue={updateInputValueHandler.bind(this, "purchase")}
            value={enteredPurchase}
            placeholder='Enter point of purchase'
            ref={inputRef8}
            onSubmitEditing={() => inputRef8.current?.focus()}
            blurOnSubmit={false}
          />

          <InputTwo
            label='Variant'
            onUpdateValue={updateInputValueHandler.bind(this, "variant")}
            value={enteredVariant}
            placeholder='Enter variant'
            ref={inputRef9}
            onSubmitEditing={() => inputRef9.current?.focus()}
            blurOnSubmit={false}
          />

          {/* SKU */}
          <DropdownComponent
            label='SKU'
            data={data.sku}
            value={enteredSku}
            onUpdateValue={updateInputValueHandler.bind(this, "sku")}
            ref={inputRef10}
            onSubmitEditing={() => inputRef10.current?.focus()}
            blurOnSubmit={false}
          />

          <InputTwo
            label='Pricing'
            onUpdateValue={updateInputValueHandler.bind(this, "pricing")}
            value={enteredPricing}
            placeholder='Enter pricing'
            ref={inputRef11}
            onSubmitEditing={() => inputRef11.current?.focus()}
            blurOnSubmit={false}
          />

          <InputTwo
            label='Feedback'
            onUpdateValue={updateInputValueHandler.bind(this, "feedback")}
            value={enteredFeedback}
            placeholder='Enter feedback'
            ref={inputRef12}
            onSubmitEditing={() => inputRef12.current?.focus()}
            blurOnSubmit={false}
          />

          {/* location functionality */}
          <LocationPicker onLocationHandler={takeLocationHandler} resetForm={resetForm} />

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
