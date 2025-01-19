import { View, Text, StyleSheet, Image} from 'react-native'
import React, { useState, useEffect} from 'react'
import * as Location from 'expo-location';


import { getGoogleMapPreview } from '../util/location';
import { useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import { GlobalStyles } from '../Constants/Globalcolors';
import SecondaryButton from './SecondaryButton';


const LocationPicker = ({onLocationHandler}) => {
        const [locationPermissionInformation, requestPermission] = Location.useForegroundPermissions();
        const [isFetchingLocation, setIsFetchingLocation] = useState(false);
        const [pickedLocation, setPickedLocation] = useState(null)
        const  navigation = useNavigation()
        const route = useRoute();
        const isFocused = useIsFocused()

    async function verifyLocationPermission(){
          if(locationPermissionInformation.status === Location.PermissionStatus.UNDETERMINED){
              const isPermission =  await requestPermission();
              return isPermission.granted
          }

          if(locationPermissionInformation.status === Location.PermissionStatus.DENIED){
              Alert.alert("Denied location Permission", "You need to accept location permission to continue")
              return false;
          }

          return true;
      }

    //   useEffect(() => {
    //     async function handleAddressLocation(){
    //      if(pickedLocation){

    //       const address =  await getAddress(pickedLocation.lat, pickedLocation.long)
    //        if(address){
    //         onLocationHandler(pickedLocation)
    //        }
    //      }
    //     }

    //     handleAddressLocation();
    //    },[pickedLocation])

      useEffect(() => {
        if(route.params && isFocused){
          const mapPickedLocation = {
            lat: route.params.pickedlat,
            long: route.params.pickedlng
          }
          setPickedLocation(mapPickedLocation)
        }
      }, [route, isFocused])



  async function handleGetLocation(){
      const hasPermission = await verifyLocationPermission();

      if(!hasPermission){
        return;
      }
      setIsFetchingLocation(true)
      const {coords} = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setIsFetchingLocation(false)
      setPickedLocation({
        lat: coords.latitude,
        long: coords.longitude
      })

    //   if(locationObj){
    //     console.log("Coords got", coords)
    //   }else{
    //     console.log("Location not picked")
    //   }

  }

  function handleGetMap(){
      navigation.navigate("Map");
  }

   React.useEffect(() => {

      }, [isFetchingLocation]);
      let content = <Text style={styles.text}>You have no location picked yet</Text>

      if(pickedLocation){
        const locationUrl =  getGoogleMapPreview(pickedLocation.lat, pickedLocation.long);

        if(locationUrl){
          content =  <Image style={styles.image} source={{uri:locationUrl}}/>
        }else{
          content = <Text style={styles.text}>Error showing the location</Text>
        }

      }

  return (
    <View>
      <View style={styles.locationContainer}>
        {content}
      </View>
      <View style={styles.buttonHolder}>
         <View style={styles.buttoncontainer}>
         <SecondaryButton icon="location" onPress={handleGetLocation}>Locate User</SecondaryButton>
         </View>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
    locationContainer: {
      borderRadius: 6,
      width: "100%",
      height: 200,
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: GlobalStyles.colors.gray800,
      marginTop: 18,
      elevation: 6,
      shadowColor: 'gray',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.75,
      shadowRadius: 4,
    },

    text: {
      color: "#fff"
    },

    buttoncontainer: {
        flex: 1,
    },

    buttonHolder: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        columnGap: 8,
    },
    image: {
      width: "100%",
      height: "100%",
    }

})