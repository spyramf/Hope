import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import { useNavigation, StackActions } from "@react-navigation/native";
import { useLogin } from "../../contexts/LoginProvider";
const sendUccRequest = require("../../api/uccService");
const sendXManRequest = require("../../api/MandateServices");
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const ProcessCompleted = () => {
  const [loading, setLoading] = useState(false); // For loading indicator
  const navigation = useNavigation();
  const { setIsLoggedIn } = useLogin();

  const signUp = async () => {
    setLoading(true);
    try {
      const UccRequest = await sendUccRequest();
       console.log(UccRequest);

      const Log = await AsyncStorage.getItem("LoginData");
      if (!Log) throw new Error("Login data not found.");

      const parsedLog = JSON.parse(Log);
      const dob = parsedLog.user.dob;
      // console.log(dob);

      const [day, month, year] = dob.split("/");
      const formattedDob = `${month}/${day}/${year}`;

      console.log("Formatted DOB:", formattedDob);
      let occupation = parsedLog.user.occupation;
      console.log(occupation);
      const occupationCode = parsedLog.user.occupation;
      if (occupation === "01") {
        occupation = "B";
      } else {
        occupation = "S";
      }

      console.log("Updated Occupation:", occupation);

      const param = `${parsedLog.user.pan}||${parsedLog.user.firstName}|${formattedDob}|||${parsedLog.user.taxStatus}|P|1|${parsedLog.user.city}|IN|IN|${parsedLog.user.pan}|C||||||||||01||32|||N|${occupationCode}|${occupation}|||||||||||B|N||||||||||||||||||||||||||N|N||N|||`;

      const Flag = "01";
      const FatRequest = await sendXManRequest({ Flag, param });
      console.log(FatRequest);

      // Navigate to a new stack screen without going back to previous screens
      navigation.navigate("Home");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to complete the process:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../screens/AppImage/Completed.png")}
          style={styles.image}
          accessibilityLabel="Process Completed Image"
        />
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <OnBtn title="Process Completed" handelSubmit={signUp} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center", // Center everything
    alignItems: "center", // Center horizontally
    padding: 16,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.7, // 70% of the screen height
  },
  image: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.5, // 50% of screen height
    resizeMode: "contain",
  },
  buttonContainer: {
    marginTop: 20,
    width: width * 0.8, // 80% of screen width
  },
});

export default ProcessCompleted;
