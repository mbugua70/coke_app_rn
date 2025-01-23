import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import { Colors } from '../../constants/styles';
import FormContainer from "./FormContainer";

function AuthContent({  onAuthenticate, name, phone, region, isAuthenticate, isUpdating }) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    region: false,
    phone: false,
  });

  function submitHandler(credentials) {
    let { name, phone, region } = credentials;

    region = region.trim();
    phone = phone.trim();
    name = name.trim();

    const nameIsValid = name.length > 2;
    const phoneRegex = /^[0-9]{7,15}$/;
    const phoneIsValid = phoneRegex.test(phone);
    const regionIsValid = region.length > 2;

    if (!regionIsValid || !phoneIsValid || !nameIsValid) {
      Alert.alert("Invalid Input", "Please check your credentials.");
      setCredentialsInvalid({
        name: !nameIsValid,
        region: !regionIsValid,
        phone: !phoneIsValid,
      });

      return;
    }
    onAuthenticate({ name, region, phone });
  }


  return (
    <View style={styles.authContent}>
      <FormContainer
        isAuthenticate={isAuthenticate}
        isUpdating={isUpdating}
        name={name}
        phone={phone}
        region={region}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({

  authContent: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    // backgroundColor: Colors.primary800,
    // elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },

});
