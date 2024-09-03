import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
const sendOtpRequest = require("../../api/otpService");
const sendCentralRequest = require("../../api/messageCentralOTP");
const validateOtp = require("../../api/validateOtp");
const sendUccRequest = require("../../api/uccService");
const sendPRequest = require("../../api/PRServices");
const sendXSipRequest = require("../../api/XSipServices");
const sendXManRequest = require("../../api/MandateServices");

import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../contexts/LoginProvider";
import axios from "axios";
import ListButton from "../../components/AccountComponent/ListButton";
const parseString = require("xml2js-parser").parseString;
const uccService = require("../../api/uccService");
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
  const requestOtpForUser = async () => {
    try {
      const phoneNumber = "918600338741"; // Replace with the actual phone number
      const channel = "SMS";
      const otpResponse = await sendOtpRequest({ phoneNumber }, { channel });

      console.log("Response from OTP service:", otpResponse);
    } catch (error) {
      console.error("Failed to request OTP:", error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////
  const requestUccForUser = async () => {
    try {
      const verificationId = "813242"; // Replace with the actual phone number
      const code = "1490";
      mobileNumber="9970735694";
      const otpResponse = await validateOtp({
        verificationId,
        code,
        mobileNumber,
      });

      console.log("Response from OTP service:", otpResponse);
    } catch (error) {
      console.error("Failed to request OTP:", error);
    }
  };


  const getData = async () => {
    const res = await client.get("/get-name");

    let data = res.data[111].SchemeName;

    console.log(data);
  };

  /////////////////////////////////////////////////////////////////////////////////////

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
        <ListButton title="Create UCC" handelSubmit={handleUserRegistration} />
        <ListButton title="FATCA" handelSubmit={FATCAUpload} />
        <ListButton title="Create Mandate" handelSubmit={getMan} />
        <ListButton
          title="Setup AutoPay"
          handelSubmit={() => navigation.navigate("AutoPay")}
        />
        <ListButton title="Help & Support" handelSubmit={getData} />

        <ListButton title="Logout" handelSubmit={requestUccForUser} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default Account;
