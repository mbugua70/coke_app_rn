import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, Platform } from 'react-native';
import {useIsFocused} from "@react-navigation/native"
import React, { useState, useEffect } from 'react'
import { GlobalStyles } from '../Constants/Globalcolors';
import FetchButton from './FetchButton';
import { fetchRecordData } from '../http/api';

import Toast from "react-native-toast-message";

const OfflineComp =  () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null)
    const [overall, setOverall] = useState(0);
    const [today, setToday] = useState(0);
    const [isFetching, setIsFetching] = useState(false)
    const [isOffline, setIsOffline] = useState(false);
    const [isInternetReachable, setIsInternetReachable] = useState(false);
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


      useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
          setIsOffline(!state.isConnected);
          setIsInternetReachable(state.isInternetReachable)
        });

        return () => unsubscribe();
      }, []);



    async function handleFetchRecord(){
        if(!phone){
          throw new Error("No phone number provided")
        }


        if (isOffline) {
          Toast.show({
            type: 'error',
            text1: 'Network Error',
            text2: 'No internet connection. Please try again later.',
          });
          return;
        }else if(!isInternetReachable){
          Toast.show({
            type: 'error',
            text1: 'Network Error',
            text2: 'No internet access',
          });
          return;
        }

        try{
        setIsFetching(true);
        const res = await fetchRecordData(phone)
        setIsFetching(false)
         if(res){
            const data = JSON.parse(res);
            console.log("Response user data", data)
            setToday(data.today)
            setOverall(data.overall)
         }

        }catch(error){
            console.log(error);
            setIsFetching(false);
            if(error){
              setError(error.message || 'An error occurred while fetching data.');
            }
        }
   }

   useEffect(() => {
    if(error){
        Toast.show({
            type: "error",
            text1: "Error",
            text2: error,
          });

    }
  }, [error])



  return (
    <View style={styles.screen}>
        <FetchButton onPress={handleFetchRecord} isFetching={isFetching} />
       <View style={styles.screenContainer}>
          <View style={styles.recordCardOne}>
          <Text style={styles.offlineTitle}>Overall</Text>
          <Text style={styles.record}>{overall}</Text>
          </View>
          <View style={styles.recordCardTwo}>
          <Text style={styles.offlineTitle}>Today</Text>
          <Text style={styles.record}>{today}</Text>
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