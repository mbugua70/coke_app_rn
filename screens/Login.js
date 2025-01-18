import { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet} from 'react-native'


// import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/store'
import AuthContent from "../components/AuthContent"
import CocaColaTitle from "../UI/CokeHead"

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null)
  const {authenticate} = useContext(AuthContext);

  async function loginHandler({name, phone, region}){
    try{
      setIsAuthenticated(true)
      setIsAuthenticated(false)
      const tokenData = { name, phone, region };

      authenticate(JSON.stringify(tokenData))

    }catch(error){

      if (error.response) {

        // setError(error.response.data.error.message)
        setError("Invalid credintials, Please check your details");

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

  console.log(error);

useEffect(() => {
  if(error && !isAuthenticated){
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error,
    })

  }else if(error === "TOO_MANY_ATTEMPTS_TRY-LATER" && !isAuthenticated){
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Too many attempts try later',
    })
  }
}, [error, isAuthenticated])


  return (
    <View style={styles.screen}>
         <View style={styles.cokeHeadStyle}>
           <CocaColaTitle size="40"/>
         </View>

         <AuthContent isLogin onAuthenticate={loginHandler}/>

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginBlock: 10,
  },

  cokeHeadStyle: {
    marginTop: 62,
    marginHorizontal: 16,
    padding: 16,
  }

})