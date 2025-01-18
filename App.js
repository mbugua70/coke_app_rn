import {useContext, useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalStyles } from './Constants/Globalcolors';
import { AuthContextProvider } from './store/store';
import { AuthContext } from "./store/store";


import Login from './screens/Login';
import CocaColaTitle from "./UI/CokeHead"
import Home from './screens/Home';
import Report from './screens/Report';
import IconButton from './UI/Icon';


const Stack = createNativeStackNavigator();


function AuthStack(){
 return(
  <>
    <Stack.Navigator screenOptions={{
    headerTitleAlign: 'left',
}}>
    <Stack.Screen name="Login"  component={Login} options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#fff",
            }
          }}/>
</Stack.Navigator>
  </>
 )
}

function AuthenticatedStack() {
  const authctx = useContext(AuthContext)
  function handlelogout(){
    authctx.logout();
  }
  return (
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'left',
  }}>
          <Stack.Screen name="Home" component={Home} options={{
            headerShadowVisible: false,
            contentStyle:{
              backgroundColor: GlobalStyles.colors.primary50,
            },
            headerTitle: () => <CocaColaTitle size="30"/>,
            headerRight: ({ headerTintColor })  => {
              return <IconButton color={GlobalStyles.colors.primary800} size="24" name="person"/>;
            },
          }}/>

          <Stack.Screen name="Report" component={Report} options={{
            headerShadowVisible: false,
            contentStyle:{
              backgroundColor: GlobalStyles.colors.primary50,
            },
            headerTitle: "Report",
            headerRight: ({ headerTintColor })  => {
              return <IconButton color={GlobalStyles.colors.primary800} size="24" name="person"/>;
            },
          }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authctx = useContext(AuthContext)
  return (

    <NavigationContainer>
      {authctx.isAuthenticate ? <AuthenticatedStack/> : <AuthStack/> }
    </NavigationContainer>

  );
}

function TokenHolder(){
   const authctx = useContext(AuthContext)
   const [isAppReady, setIsAppReady] = useState(true)
  useEffect(() => {
    async function fetchingToken(){
        const token = await AsyncStorage.getItem("token")
        console.log(token)
        if(token){
            authctx.authenticate(token)
        }
        setIsAppReady(false);
     }

     fetchingToken();
   },[])


  //  if(isAppReady){
  //   SplashScreen.hide();
  //  }

  return <Navigation/>;
}

export default function App() {
  return (
    <>
     <StatusBar style='dark'/>
      <AuthContextProvider>
        <TokenHolder/>
     </AuthContextProvider>
    </>
  );
}
