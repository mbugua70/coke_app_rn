import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext({
    token: "",
    authenticate: (token)=>{},
    isAuthenticate: false,
    logout: () =>{}
})


export function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState()



    function authenticate(token){
     setAuthToken(token);
     AsyncStorage.setItem("token", token)
    }


    function logout(){
        AsyncStorage.removeItem("token");
        setAuthToken(null);
    }


    const value = {
        token: authToken,
        isAuthenticate: !!authToken,
        authenticate: authenticate,
        logout: logout,

    }


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}