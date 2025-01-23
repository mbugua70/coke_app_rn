import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from "../store/store";
import AuthContent from "../components/AuthContent";
import { GlobalStyles } from "../Constants/Globalcolors";

const EditProfile = ({ route }) => {
  const { authenticate, isAuthenticate } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const { name, phone , region} = route.params;



  async function updateHandler({ name, phone, region }) {
    try {
      setIsAuthenticated(true);
      const tokenData = { name, phone, region };

      authenticate(JSON.stringify(tokenData));
      setIsAuthenticated(false);
    } catch (error) {
      if (error.response) {
        // setError(error.response.data.error.message)
        setError("Invalid credintials, Please check your details");

        // console.log('Status Code:', error.response.status);
        // console.log('Response Data:', error.response.data);
        // console.log('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        setError("Please check your network");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error Message:", error.message);
      }
      setIsAuthenticated(false);
    }
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (error && !isAuthenticated) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error,
      });
    } else if (error === "TOO_MANY_ATTEMPTS_TRY-LATER" && !isAuthenticated) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Too many attempts try later",
      });
    }
  }, [error, isAuthenticated]);

  return (
    <View style={styles.screen}>
      {/* title update profile */}
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Update Profile</Text>
      </View>
      {/* form component */}
      <AuthContent
        onAuthenticate={updateHandler}
        isUpdating = {true}
        isAuthenticate = {isAuthenticate}
        name={name}
        phone={phone}
        region={region}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  textContainer: {
    marginHorizontal: 16,
    padding: 16,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary800,
  }
})
