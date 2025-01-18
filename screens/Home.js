import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'

import CategoryItem from "../components/CategoryItem"

const Home = ({navigation}) => {

    function handleNavigation(){
    navigation.navigate("Report");
    }

  return (
   <>
     <StatusBar hidden={true}/>

       <CategoryItem onNavigate={handleNavigation}/>

   </>
  )
}

export default Home
