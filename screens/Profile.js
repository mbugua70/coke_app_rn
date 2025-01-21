// What we will have in this component:
// 1. A profile picture
// 2. A title of the screen
// 3. A logout button
// 4. A button to edit the profile
// 5. A User name

import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStyles } from '../Constants/Globalcolors'


import { AuthContext } from '../store/store';
import ProfilePic from '../components/ProfilePic'
import UserName from '../components/UserName'
import ProfileIconUI from '../UI/ProfileIcon'
import { useNavigation, useIsFocused} from '@react-navigation/native';

const Profile = () => {
   const authctx =  useContext(AuthContext)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [region, setRegion] = useState("");
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    console.log("is focused",isFocused);

    // fetching user name from storage
    useEffect(() => {
      async function handleToken() {
        const token = await AsyncStorage.getItem("token")
         if(token){
            const user = JSON.parse(token);
            setName(user.name);
            setPhone(user.phone);
            setRegion(user.region);
         }
      }

      handleToken();
    }, [isFocused])

     function editHandler (){
        navigation.navigate("Edit Profile", {
          name: name,
          phone: phone,
          region: region
        })
     }

     function signoutHandler (){
       Alert.alert("Sign out", "Are you sure you want to sign out?", [{text: 'Confirm', onPress: () => {
        console.log("signing off");
        authctx.logout();
       }}, {text: 'Cancel', style: 'cancel'}])
     }

  return (
    <View style={styles.screen}>
       <View style={styles.screenChild}>
           <ProfilePic/>
           <UserName name={name} phone={phone}/>
       </View>
       {/* edit profile */}
       <View style={styles.screen2}>
          <ProfileIconUI name="person" size={24} color={GlobalStyles.colors.primary800} onPress={editHandler} text="Edit profile" bg="#fff"/>

          {/* signout */}
          <ProfileIconUI name="log-out" size={24} color={GlobalStyles.colors.gray800} onPress={signoutHandler} text="Sign Out" bg="#fff"/>
       </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    screenChild: {
      alignItems: 'center',
      paddingVertical: 25,
    },
    screen2: {
      padding: 10,
      backgroundColor: GlobalStyles.colors.primary50,
      height: "100%",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      elevation: 6,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,

    }
})