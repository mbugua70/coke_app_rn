import { useState } from "react";
import { Alert, StyleSheet, View, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SummaryForm } from "../http/api";
// import { Colors } from '../../constants/styles';

import Toast from "react-native-toast-message";
import FormContainerTwo from "./FormContainerTwo";

function AuthContentTwo({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    phone: false,
    age: false,
    soda: false,
    beverage: false,
    reason: false,
    frequency: false,
    purchase: false,
    variant: false,
    sku: false,
    pricing: false,
    feedback: false,
    purchase: false,
  });

  async function submitHandler(credentials) {
    let {
      name,
      phone,
      age,
      soda,
      beverage,
      reason,
      frequency,
      purchase,
      variant,
      sku,
      pricing,
      feedback,
      lat,
      long,
    } = credentials;

    phone = phone.trim();
    name = name.trim();
    age = age.trim();
    soda = soda.trim();
    beverage = beverage.trim();
    reason = reason.trim();
    frequency = frequency.trim();
    variant = variant.trim();
    sku = sku.trim();
    feedback = feedback.trim();
    purchase = purchase.trim();

    const nameIsValid = name.length > 2;
    const phoneRegex = /^[0-9]{7,15}$/;
    const phoneIsValid = phoneRegex.test(phone);
    const ageIsValid = age.length > 2;
    const sodaIsValid = soda.length > 1;
    const beverageIsValid = beverage.length > 2;
    const reasonIsValid = reason.length > 2;
    const frequencyIsValid = frequency.length > 2;
    const variantIsValid = variant.length > 2;
    const skuIsValid = sku.length > 2;
    const feedbackIsvalid = feedback.length > 2;
    const pricingIsValid = pricing.length > 2;
    const purchaseIsValid = purchase.length > 2;

    if (
      !beverageIsValid ||
      !sodaIsValid ||
      !ageIsValid ||
      !nameIsValid ||
      !phoneIsValid ||
      !reasonIsValid ||
      !frequencyIsValid ||
      !variantIsValid ||
      !skuIsValid ||
      !feedbackIsvalid ||
      !pricingIsValid ||
      !purchaseIsValid
    ) {
      Alert.alert("Invalid input", "Please check your input values.");
      setCredentialsInvalid({
        name: !nameIsValid,
        soda: !sodaIsValid,
        age: !ageIsValid,
        beverage: !beverageIsValid,
        phone: !phoneIsValid,
        reason: !reasonIsValid,
        frequency: !frequencyIsValid,
        variant: !variantIsValid,
        sku: !skuIsValid,
        pricing: !pricingIsValid,
        feedback: !feedbackIsvalid,
        purchase: !purchaseIsValid
      });
      return;
    }

    try {
      // Submit the form data
      setIsSubmitting(true);
      const response = await SummaryForm(
        name,
        phone,
        age,
        soda,
        beverage,
        reason,
        frequency,
        purchase,
        variant,
        sku,
        pricing,
        feedback,
        lat,
        long
      );

      setIsSubmitting(false);

      // Optionally, show success feedback to the user
      // adding user UI  alert message for successful data upload
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Data submitted successfully!",
      });
      setResetForm((prev) => !prev);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting form:", error);
      Toast.show({
        type: "error",
        text1: "Submission failed",
        text2: error.message || "An unknown error occurred.",
      });
      // Alert.alert(
      //   "Submission failed",
      //   error.message || "An unknown error occurred."
      // );
    }
  }

  return (
    <View style={styles.authContent}>
      <FormContainerTwo
        resetForm={resetForm}
        isSubmiting={isSubmiting}
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
    </View>
  );
}

export default AuthContentTwo;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    // marginTop: 48,
    paddingTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingBottom: Platform.select({ ios: 20, android: 70 }),
    // backgroundColor: Colors.primary800,
  },
});
