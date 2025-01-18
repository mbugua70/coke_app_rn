import { View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';

import Input from "./Input";
import FlatButton from "../UI/FlatButton";


const FormContainer = ({isLogin, onSubmit, credentialsInvalid }) => {
   const [enteredName, setEnteredName] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredRegion, setEnteredRegion] = useState('');
    const navigaton = useNavigation();


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
      onSubmit({
        name: enteredName,
        phone: enteredPhone,
        region: enteredRegion,
      });
    }


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
         <FlatButton onPress={submitHandler}>
            Register
         </FlatButton>
        </View>

       </View>
    </View>
  )
}

export default FormContainer

const styles = StyleSheet.create({

  submitContainer: {
    marginTop: 20,
  }

})