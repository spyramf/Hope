import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import client from "../../api/client";
const sendCentralRequest = require("../../api/messageCentralOTP");
const sendXManRequest = require("../../api/MandateServices");
const PriceApiNav = require("../../api/PriceApiNav");
const PriceApiHistory = require("../../api/PriceApiHistory");
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../contexts/LoginProvider";
import ListButton from "../../components/AccountComponent/ListButton";
const parseString = require("xml2js-parser").parseString;
import AsyncStorage from "@react-native-async-storage/async-storage";
const Account = () => {
  const navigation = useNavigation();
  const [faPass, setFaPass] = useState();
  const { setIsLoggedIn, profile } = useLogin();
  const [result, setResult] = useState();

  const handleUserRegistration = async () => {
    try {
      const mobileNumber = "9970735694";
      const otpResponse = await sendCentralRequest(mobileNumber);

      console.log("OTP :", otpResponse);
      // Handle navigation after successful registration
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };
  ///////////////////////////////////////////////////////
  const requestPriceApi = async () => {
    try {
      const otpResponse = await PriceApiNav();

      console.log("Response from OTP service:", otpResponse);
    } catch (error) {
      console.error("Failed to request OTP:", error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////

  const requestPriceApiHistory = async () => {
    try {
      const otpResponse = await PriceApiHistory();

      console.log("Response from OTP service:", otpResponse);
    } catch (error) {
      console.error("Failed to request OTP:", error);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////

  const helpSupport = async () => {
    try {
     navigation.navigate("Help And Support");
    } catch (error) {
      console.error("Failed to request OTP:", error);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////

  const requestManRequest = async () => {
    try {
      const Log = await AsyncStorage.getItem("LoginData");
      const parsedLog = JSON.parse(Log);
      console.log("Login Data:", parsedLog);

      let occupation = parsedLog.user.occupation;
      console.log(occupation);
      const occupationCode = parsedLog.user.occupation;
      if (occupation === "01") {
        occupation = "B";
      } else {
        occupation = "S";
      }
      const ClientCode = parsedLog.user.ucc;
      console.log("Updated Occupation:", occupation);

      const param = `${parsedLog.user.ucc}|500000|N|${parsedLog.user.accNo}|${parsedLog.user.accType}|${parsedLog.user.ifsc}||18/09/2024|01/02/2054`;
      const Flag = "06";
      const FatRequest = await sendXManRequest({ Flag, param, ClientCode });
      console.log(FatRequest);

      // Navigate to a new stack screen without going back to previous screens
      navigation.navigate("Account");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to complete the process:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////

  const requestLogout = async () => {
    try {
      const Log = await AsyncStorage.getItem("LoginData");
      if (!Log) {
        throw new Error("No login data found");
      }

      const parsedLog = JSON.parse(Log);
      const token = parsedLog.token;

      if (!token) {
        throw new Error("No token found in login data");
      }

      const JwtToken = "JWT " + token;
      console.log("JWT Token:", JwtToken);

      const res = await client.post(
        "/sign-out",
        {}, // Body can be empty or if needed send an empty object
        {
          headers: {
            Authorization: JwtToken,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Logout response:", res.data);
      navigation.navigate("Login");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized. Token might be invalid or expired.");
      } else {
        console.error("Failed to complete the process:", error);
      }

      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Layout>
      <View>
        <Text
          style={{
            marginTop: 20,
            margin: 10,
            fontSize: 16,
            fontWeight: "500",
            color: "#2E436C",
          }}
        >
          Hello Pradeep Hari Gangurde
        </Text>
        <ListButton
          title="Profile"
          handelSubmit={() => navigation.navigate("Profile")}
        />
        <ListButton title="Create Mandate" handelSubmit={requestManRequest} />
        <ListButton
          title="Setup AutoPay"
          handelSubmit={() => navigation.navigate("AutoPay")}
        />
        <ListButton title="Help & Support" handelSubmit={helpSupport} />

        <ListButton title="Logout" handelSubmit={requestLogout} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default Account;
