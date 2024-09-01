import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import client from "../api/client";

const sendXManRequest = require("../api/MandateServices");

const axios = require("axios");
const Test = ({ navigation }) => {




let lastSerialNumber = 0; // Store the last used serial number

function generateSerialNumber() {

 
  const prefix = "SP";
  lastSerialNumber += 1; // Increment the last serial number
  const serialNumber = lastSerialNumber.toString().padStart(8, "0"); // Ensure it's 8 digits

  return prefix + serialNumber;
}

// Example usage


  
const requestOtpForUser = async () => {

   const res = await client.get("/getUser-data");
const data = res.data
const lastValue = data[data.length - 1];
console.log(lastValue);

};



  const handleUserRegistration = async () => {
    try {
      const otpResponse = await sendXManRequest();

      console.log("OTP :", otpResponse);
      // Handle navigation after successful registration
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };


  return (
    <View>
      <TouchableOpacity onPress={handleUserRegistration}>
        <Text>button</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;
