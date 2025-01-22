import { View, Text, StyleSheet, Pressable} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, {useState, useLayoutEffect} from 'react';

import Input from "./Input";
import FlatButton from "../UI/FlatButton";


const FormContainer = ({ onSubmit, credentialsInvalid, isAuthenticate, name, phone, region, isUpdating}) => {
   const [enteredName, setEnteredName] = useState(name ? name : "");
    const [enteredPhone, setEnteredPhone] = useState(phone ? phone : "");
    const [enteredRegion, setEnteredRegion] = useState(region ? region : "");
    const isFocused = useIsFocused()
    const navigation = useNavigation();


    const {
      name: nameIsValid,
      phone: phoneIsInvalid,
      region: regionIsInvalid,
    } = credentialsInvalid;

    function  updateInputValueHandler(inputType, enteredValue) {
      switch (inputType) {
        case 'name':
          setEnteredName(enteredValue);
          break;
        case 'phone':
          setEnteredPhone(enteredValue);
          break;
        case 'region':
          setEnteredRegion(enteredValue);
          break;
      }
    }

    function submitHandler() {
      console.log("text",enteredName, enteredPhone, enteredRegion)
      onSubmit({
        name: enteredName,
        phone: enteredPhone,
        region: enteredRegion,
      });


      if (isUpdating && enteredName !== "" && enteredPhone !== "" &&  enteredRegion !== "") {
        // navigation.setParams(
        //    { name: enteredName, phone: enteredPhone, region: enteredRegion },
        // );
        navigation.goBack();
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => {
          return (
            <Pressable
              hitSlop={20}
              onPress={submitHandler}
              style={({ pressed }) =>
                pressed ? [styles.button, styles.pressed] : styles.button
              }>
              <Text style={styles.textButton}>Save</Text>
            </Pressable>
          );
        },
      });
    }, [navigation, submitHandler]);


  return (
    <View>
       <View>

       <Input
          label="Name"
          onUpdateValue={updateInputValueHandler.bind(this, 'name')}
          value={enteredName}
          isInvalid={nameIsValid}
          icon="account"
        />

       <Input
          label="Your Phone Number"
          onUpdateValue={updateInputValueHandler.bind(this, 'phone')}
          value={enteredPhone}
          isInvalid={phoneIsInvalid}
          icon="phone"
          keyboardType="numeric"
        />


          <Input
          label="Region"
          onUpdateValue={updateInputValueHandler.bind(this, 'region')}
          value={enteredRegion}
          isInvalid={regionIsInvalid}
          icon="map-marker"
        />


       {/* button content */}
        <View style={styles.submitContainer}>
         {!isUpdating &&  <FlatButton onPress={submitHandler}>
            Register
         </FlatButton>}
        </View>

       </View>
    </View>
  )
}

export default FormContainer

const styles = StyleSheet.create({

  submitContainer: {
    marginTop: 20,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "400",
  },
  button: {
    padding: 6,
  },
  pressed: {
    opacity: 0.75,
  },

})