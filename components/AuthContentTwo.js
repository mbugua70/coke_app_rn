import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import { Colors } from '../../constants/styles';
import FormContainerTwo from "./FormContainerTwo";
import { SummaryForm } from "../http/api";

function AuthContentTwo({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    phone: false,
    age: false,
    soda: false,
    beverage: false,
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

    const nameIsValid = name.length > 2;
    const phoneRegex = /^[0-9]{7,15}$/;
    const phoneIsValid = phoneRegex.test(phone);
    const ageIsValid = age.length > 2;
    const sodaIsValid = soda.length > 1;
    const beverageIsValid = beverage.length > 2;

    if (
      !beverageIsValid ||
      !sodaIsValid ||
      !ageIsValid ||
      !nameIsValid ||
      !phoneIsValid
    ) {
      Alert.alert("Invalid input", "Please check your input values.");
      setCredentialsInvalid({
        name: !nameIsValid,
        soda: !sodaIsValid,
        age: !ageIsValid,
        beverage: !beverageIsValid,
        phone: !phoneIsValid,
      });
      return;
    }

    try {
      // Submit the form data
      setIsSubmitting(true)
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

      setIsSubmitting(false)
      console.log("API Response:", response);

      // Optionally, show success feedback to the user
      // adding user UI  alert message for successful data upload
      Alert.alert("Success", "Data submitted successfully!");
    } catch (error) {
      setIsSubmitting(false)
      console.error("Error submitting form:", error);
      Alert.alert(
        "Submission failed",
        error.message || "An unknown error occurred."
      );
    }
  }


  return (
    <View style={styles.authContent}>
      <FormContainerTwo
        isSubmiting= {isSubmiting}
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

    // backgroundColor: Colors.primary800,
  },
});
