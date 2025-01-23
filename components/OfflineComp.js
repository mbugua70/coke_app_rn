import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, Platform } from 'react-native';
import {useIsFocused} from "@react-navigation/native"
import { ActivityIndicator, MD2Colors } from 'react-native-paper';



import React, { useState, useEffect } from 'react'
import { GlobalStyles } from '../Constants/Globalcolors';
import FetchButton from './FetchButton';
import { fetchRecordData } from '../http/api';

const OfflineComp =  () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null)
    const [Overall, setOverall] = useState(0);
    const [Today, setToday] = useState(0);
    const [isFetching, setIsFetching] = useState(false)
    const isFocused = useIsFocused();
    console.log("is focused",isFocused);


    useEffect(() => {
        async function handleToken() {
          const token = await AsyncStorage.getItem("token")
           if(token){
              const user = JSON.parse(token);
              setPhone(user.phone);
           }
        }

        handleToken();
      }, [isFocused])


    async function handleFetchRecord(){
        if(!phone){
          throw new Error("No phone number provided")
        }
        try{
        setIsFetching(true);
        const data = await fetchRecordData(phone)
         if(data){
            setToday(data.today)
            setOverall(data.overall)
         }
         setIsFetching(false)

        }catch(error){
            setIsFetching(false);
            if(error){
                setError(error.message)
            }
        }
   }

   useEffect(() => {
    if(error){
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error,
      })

    }
  }, [error])



  return (
    <View style={styles.screen}>
        <FetchButton onPress={handleFetchRecord}/>
       <View style={styles.screenContainer}>
          <View style={styles.recordCardOne}>
          <Text style={styles.offlineTitle}>Overall</Text>
          <Text style={styles.record}>{Overall}</Text>
          </View>
          <View style={styles.recordCardTwo}>
          <Text style={styles.offlineTitle}>Today</Text>
          <Text style={styles.record}>{Today}</Text>
          </View>
       </View>
    </View>
  )
}

export default OfflineComp


const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 18,
    height: 150,
    borderRadius: 8,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: GlobalStyles.colors.primary100,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',


  },

  screenContainer: {
     flexDirection: 'row',
     marginHorizontal: 4,
     height: '100%',
     alignItems: 'flex-end',
     padding: 8,
  },


  offlineTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'gray'
  },

  recordCardOne: {
    borderRadius: 8,
    marginHorizontal: 4,
    height: 80,
    width: 100,
    backgroundColor: GlobalStyles.colors.accent50,
    justifyContent: 'flex-end',
    padding: 8,
  },

  recordCardTwo: {
    height: 60,
    width: 100,
    backgroundColor: '#f2eded',
    justifyContent: 'flex-end',
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 8,
  },

  record: {
    fontSize: 22,
    fontWeight: '600'
  }

})