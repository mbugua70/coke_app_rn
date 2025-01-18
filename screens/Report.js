import { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native'
import React from 'react'
import AuthContentTwo from '../components/AuthContentTwo'

const Report = () => {


    async function submitHandler({name, phone, region}){
        try{
          setIsAuthenticated(true)

          setIsAuthenticated(false)



        }catch(error){

          if (error.response) {

            // setError(error.response.data.error.message)
            setError("Invalid Data, Please check your details");

            // console.log('Status Code:', error.response.status);
            // console.log('Response Data:', error.response.data);
            // console.log('Headers:', error.response.headers);


          } else if (error.request) {
            // The request was made, but no response was received
            setError("Please check your network")
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error Message:', error.message);
          }
          setIsAuthenticated(false)
        }
        setIsAuthenticated(false)
      }
  return (
     <>
       <AuthContentTwo onAuthenticate={submitHandler}/>
     </>
  )
}

export default Report