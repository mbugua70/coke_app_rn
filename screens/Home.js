import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'

import CategoryItem from "../components/CategoryItem"
import OfflineComp from '../components/OfflineComp';

const Home = ({navigation}) => {

    function handleNavigation(){
    navigation.navigate("Report");
    }

    function handleNavigationRecord(){
      navigation.navigate("Record")
    }

  return (
   <>
     <StatusBar hidden={true}/>

      <View style={styles.screen}>
        <OfflineComp />
       <CategoryItem color="#49393a" title="REPORT" onNavigate={handleNavigation}/>
       {/* <CategoryItem color="#49393a" title="RECORD" onNavigate={handleNavigationRecord}/> */}
      </View>

   </>
  )
}

export default Home

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  }
})
