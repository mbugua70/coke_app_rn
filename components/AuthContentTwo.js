import { useState} from 'react';
import { Alert, StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";


// import { Colors } from '../../constants/styles';
import FormContainerTwo from './FormContainerTwo';

function AuthContentTwo({ isLogin, onAuthenticate }) {
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
    const phoneIsValid = phone.lenth > 6;
    const regionIsValid =  region.length > 2;


    if (
      !regionIsValid ||
      !phoneIsValid ||
      (!isLogin)
    ) {
      Alert.alert('Invalid input', 'Please check your credentials.');
      setCredentialsInvalid({
        name: !nameIsValid,
        region: !regionIsValid,
        phone: !phoneIsValid,
      });

      return;
    }
    onAuthenticate({ name, region, phone});
  }

  return (
    <View style={styles.authContent}>
      <FormContainerTwo
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
    // marginTop: 48,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    // backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});
