import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const LandingPage = () => {
  const navigation = useNavigation();

  // const checkOnboardingStatus = async () => {
  //   try {
  //     // Retrieve stored values for all onboarding steps
  //     const savedMobile = await AsyncStorage.getItem("mobile");
  //     const savedEmail = await AsyncStorage.getItem("email");
  //     const savedPassword = await AsyncStorage.getItem("password");
  //     const savedConfirmPassword = await AsyncStorage.getItem(
  //       "confirmPassword"
  //     );
  //     const savedPan = await AsyncStorage.getItem("pan");
  //     const savedFirstName = await AsyncStorage.getItem("firstName");
  //     const savedLastName = await AsyncStorage.getItem("lastName");
  //     const savedDob = await AsyncStorage.getItem("dob");
  //     const gender = await AsyncStorage.getItem("gender");
  //     const taxStatus = await AsyncStorage.getItem("taxStatus");
  //     const annualIncome = await AsyncStorage.getItem("annualIncome");
  //     const storedAddress = await AsyncStorage.getItem("add");
  //     const storedPin = await AsyncStorage.getItem("pin");
  //     const storedCity = await AsyncStorage.getItem("city");
  //     const storedState = await AsyncStorage.getItem("state");
  //     const storedName = await AsyncStorage.getItem("n_name");
  //     const storedDob = await AsyncStorage.getItem("n_dob");
  //     const storedPan = await AsyncStorage.getItem("n_pan");
  //     const storedRelation = await AsyncStorage.getItem("n_relation");
  //     const storedIfsc = await AsyncStorage.getItem("ifsc");
  //     const storedAccNo = await AsyncStorage.getItem("accNo");
  //     const storedBankName = await AsyncStorage.getItem("bankName");
  //     const storedAccType = await AsyncStorage.getItem("accType");
  //     console.log(savedEmail);
  //     // Navigate to the appropriate page based on the missing data
  //     if (!savedMobile) {
  //       navigation.navigate("Verify Mobile");
  //     } else if (!savedEmail) {
  //       navigation.navigate("EmailAddress");
  //     } else if (!savedPassword) {
  //       navigation.navigate("SetPassword");
  //     } else if (!savedConfirmPassword) {
  //       navigation.navigate("SetPassword");
  //     } else if (!savedPan || !savedFirstName || !savedLastName || !savedDob) {
  //       navigation.navigate("VerifyPanManualDetails");
  //     } else if (!gender) {
  //       navigation.navigate("Gender");
  //     } else if (!taxStatus) {
  //       navigation.navigate("TaxStatus");
  //     } else if (!annualIncome) {
  //       navigation.navigate("AnnualIncome");
  //     } else if (!storedAddress || !storedPin || !storedCity || !storedState) {
  //       navigation.navigate("PersonalDetails");
  //     } else if (!storedName || !storedDob || !storedPan || !storedRelation) {
  //       navigation.navigate("NomineeDetails");
  //     } else if (
  //       !storedIfsc ||
  //       !storedAccNo ||
  //       !storedBankName ||
  //       !storedAccType
  //     ) {
  //       navigation.navigate("BankDetails");
  //     } else {
  //       // All data is present, navigate to the main app
  //       navigation.navigate("Login");
  //     }
  //   } catch (error) {
  //     console.log("Error checking onboarding status:", error.message);
  //   }
  // };






  return (
    <View style={styles.container}>
      <View
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.landingImage}
          source={require("../../screens/AppImage/LandingImage.png")}
        />
      </View>
      <View style={styles.Content}>
        <Text style={styles.TextName}>
          It's not whether you're right or wrong that's important, but how much
          money you make when you're right and how much you lose when you're
          wrong
        </Text>
        <Text style={styles.Writer}>-------George Soros</Text>
      </View>
      <View style={{ top: 40, padding: 30 }}>
        {/* <OnBtn title="Create Account" handelSubmit={checkOnboardingStatus} /> */}

        <OnBtn
          title="Create Account"
          handelSubmit={() => navigation.navigate("Verify Mobile")}
        />
      </View>

      <View style={{ top: 20, padding: 30 }}>
        <OnBtn
          title="Log In"
          handelSubmit={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 32,
  },

  TextName: {
    color: "#2e436c",
    fontSize: 16,
    textAlign: "center",
  },
  Writer: {
    textAlign: "right",
    color: "#2e436c",
    top: 10,
    right: 40,
    fontStyle: "italic",
  },

  Content: {
    top: 50,
    verticalAlign: "middle",
    padding: 40,
  },

  landingImage: {
    width: width * 0.5,
    height: height * 0.4,
  },
});
export default LandingPage;
