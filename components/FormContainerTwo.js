import { View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';

import InputTwo from "./InputTwo"
import FlatButton from "../UI/FlatButton";
import DropdownComponent from "./Dropdown";



  const data = {
    ageData: [
      { label: '18-24 years', value: '18-24' },
      { label: '25-34 years', value: '25-34' },
      { label: '35-44 years', value: '35-44' },
      { label: '45-54 years', value: '45-54' },
      { label: '55-64 years', value: '55-64' },
      { label: '65+ years', value: '65+' },
    ],
    sodaData: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    beverage: [
      {label: 'Soda', value: 'Soda'},
      {label: 'Water', value: 'Water'},
      {label: 'Juice', value: 'Juice'},
      {label: 'Energy Drink', value: 'Energy Drink'}
    ]
  };


const FormContainerTwo = ({isLogin, onSubmit, credentialsInvalid }) => {
   const [enteredName, setEnteredName] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredRegion, setEnteredRegion] = useState('');
    const navigaton = useNavigation();



    const {
      name: nameIsValid,
      phone: phoneIsInvalid,
      region: regionIsInvalid,
      age: ageIsInvalid,
      soda: sodaIsInvalid,
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
      // onSubmit({
      //   name: enteredName,
      //   phone: enteredPhone,
      //   region: enteredRegion,
      // });

    }


  return (
    <View>
       <View>

       <InputTwo
          label="Name"
          onUpdateValue={updateInputValueHandler.bind(this, 'name')}
          value={enteredName}
          isInvalid={nameIsValid}

        />

       <InputTwo
          label="Your Phone Number"
          onUpdateValue={updateInputValueHandler.bind(this, 'phone')}
          value={enteredPhone}
          isInvalid={phoneIsInvalid}

        />

        <DropdownComponent isInvalid={ageIsInvalid} label="Age" data={data.ageData}/>

        {/* soda */}
        <DropdownComponent isInvalid={ageIsInvalid} label="Do you take soda" data={data.sodaData}/>

        {/* beverage */}
        <DropdownComponent isInvalid={ageIsInvalid} label="Choice of beverage" data={data.beverage}/>



          <InputTwo
          label="Region"
          onUpdateValue={updateInputValueHandler.bind(this, 'region')}
          value={enteredRegion}
          isInvalid={regionIsInvalid}
        />


       {/* button content */}
        <View style={styles.submitContainer}>
         <FlatButton onPress={submitHandler}>
            SUBMIT
         </FlatButton>
        </View>

       </View>
    </View>
  )
}

export default FormContainerTwo

const styles = StyleSheet.create({

  submitContainer: {
    marginTop: 20,
  }

})