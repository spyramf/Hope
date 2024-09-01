import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CheckStatus = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Retrieve stored values for all onboarding steps
        const mobile = await AsyncStorage.getItem("mobile");
        const email = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");
        const savedConfirmPassword = await AsyncStorage.getItem(
          "confirmPassword"
        );
        const savedPan = await AsyncStorage.getItem("pan");
        const savedFirstName = await AsyncStorage.getItem("firstName");
        const savedLastName = await AsyncStorage.getItem("lastName");
        const savedDob = await AsyncStorage.getItem("dob");
        const gender = await AsyncStorage.getItem("gender");
        const taxStatus = await AsyncStorage.getItem("taxStatus");
        const annualIncome = await AsyncStorage.getItem("annualIncome");
        const storedAddress = await AsyncStorage.getItem("add");
        const storedPin = await AsyncStorage.getItem("pin");
        const storedCity = await AsyncStorage.getItem("city");
        const storedState = await AsyncStorage.getItem("state");
        const storedName = await AsyncStorage.getItem("n_name");
        const storedDob = await AsyncStorage.getItem("n_dob");
        const storedPan = await AsyncStorage.getItem("n_pan");
        const storedRelation = await AsyncStorage.getItem("n_relation");
        const storedIfsc = await AsyncStorage.getItem("ifsc");
        const storedAccNo = await AsyncStorage.getItem("accNo");
        const storedBankName = await AsyncStorage.getItem("bankName");
        const storedAccType = await AsyncStorage.getItem("accType");

        // Navigate to the appropriate page based on the missing data
        if (!mobile) {
          navigation.navigate("MobileNo");
           } else if (!email) {
             navigation.navigate("EmailAddress");
           } else if (!savedPassword) {
             navigation.navigate("SetPassword");
           } else if (!savedConfirmPassword) {
             navigation.navigate("SetPassword");
           } else if (!savedPan) {
             navigation.navigate("VerifyPanManualDetails");
           } else if (!savedFirstName) {
             navigation.navigate("VerifyPanManualDetails");
           } else if (!savedLastName) {
             navigation.navigate("VerifyPanManualDetails");
           } else if (!savedDob) {
             navigation.navigate("VerifyPanManualDetails");
           } else if (!gender) {
             navigation.navigate("Gender");
           } else if (!taxStatus) {
             navigation.navigate("TaxStatus");
           } else if (!annualIncome) {
             navigation.navigate("AnnualIncome");
           } else if (!storedAddress) {
             navigation.navigate("PersonalDetails");
           } else if (!storedPin) {
             navigation.navigate("PersonalDetails");
           } else if (!storedCity) {
             navigation.navigate("PersonalDetails");
           } else if (!storedState) {
             navigation.navigate("PersonalDetails");
           } else if (!storedDob) {
             navigation.navigate("NomineeDetails");
           } else if (!storedName) {
             navigation.navigate("NomineeDetails");
           } else if (!storedRelation) {
             navigation.navigate("NomineeDetails");
           } else if (!storedIfsc) {
             navigation.navigate("BankDetails");
           } else if (!storedAccNo) {
             navigation.navigate("BankDetails");
           } else if (!storedBankName) {
             navigation.navigate("BankDetails");
           } else if (!storedAccType) {
             navigation.navigate("BankDetails");
           } else {
             // All data is present, navigate to the main app
             navigation.navigate("Login");
           }
      } catch (error) {
        console.log("Error checking onboarding status:", error.message);
        // Optionally navigate to an error screen or show an alert
      }
    };

    checkOnboardingStatus();
  }, []);

  return (
    <View>
      <Text>CheckStatus</Text>
    </View>
  );
};

export default CheckStatus;
