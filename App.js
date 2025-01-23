import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalStyles } from "./Constants/Globalcolors";
import { AuthContextProvider } from "./store/store";
import { AuthContext } from "./store/store";

// screens and components import
import Login from "./screens/Login";
import CocaColaTitle from "./UI/CokeHead";
import Home from "./screens/Home";
import Report from "./screens/Report";
import IconButton from "./UI/Icon";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import BackButtonIcon from "./components/BackButtonIcon";



const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


function AuthStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "left",
        }}>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
      }}>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: GlobalStyles.colors.primary50,
          },
          headerTitle: () => <CocaColaTitle size={30} />,
          headerRight: ({ headerTintColor }) => {
            return (
              <IconButton
                color={GlobalStyles.colors.primary800}
                size={24}
                name='person'
              />
            );
          },
        }}
      />

      <Stack.Screen
        name='Report'
        component={Report}
        options={{
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: GlobalStyles.colors.primary50,
          },
          headerTitle: "Report",
          headerRight: ({ headerTintColor }) => {
            return (
              <IconButton
                color={GlobalStyles.colors.primary800}
                size={24}
                name='person'
              />
            );
          },
        }}
      />


      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: "#fff",
          },
          headerTitle: "Profile",
        }}
      />

      <Stack.Screen
        name='Edit Profile'
        component={EditProfile}
        options={{
          presentation: "modal",
          headerTintColor: "#fff",
          contentStyle: {backgroundColor: "#fff"},
          headerStyle: { backgroundColor: "#fff" },
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerLeft: ({ headerTintColor }) => {
            return <BackButtonIcon tintColor={headerTintColor} />;
          },

        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authctx = useContext(AuthContext);
  console.log("screen", authctx.isAuthenticate);
  return (
    <NavigationContainer>
      {authctx.isAuthenticate ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function TokenHolder() {
  const authctx = useContext(AuthContext);
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    async function fetchingToken() {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      if (token) {
        authctx.authenticate(token);
      }
      setIsAppReady(true);
    }

    fetchingToken();
  }, []);



  if (isAppReady) {
    SplashScreen.hide();
  }


  if(!isAppReady){
    return null
  }


  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <AuthContextProvider>
        <TokenHolder />
      </AuthContextProvider>
      <Toast/>
    </>
  );
}
