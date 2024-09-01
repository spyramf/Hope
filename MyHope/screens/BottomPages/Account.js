import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
const sendOtpRequest = require("../../api/otpService");
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

  ////////////////////////////////////////////////////////////////////////////////////////////////

  // const UCCGen = async () => {
  //   const url =
  //     "https://bsestarmfdemo.bseindia.com/BSEMFWEBAPI/api/ClientRegistration/Registration";

  //   const headers = {
  //     "Content-Type": "application/json",
  //     APIKEY: "VmxST1UyRkhUbkpOVldNOQ==", // Add your API key here
  //     // Add any other headers as needed
  //   };

  //   // Define your variables
  //   const userId = "5526901";
  //   const memberCode = "55269";
  //   const password = "Pass@12345";
  //   const regnType = "NEW";
  //   const regnId = "45445454";
  //   const firstName = profile.user.firstName;
  //   const middleName = "Hari";
  //   const lastName = profile.user.lastName;
  //   const gender = profile.user.gender;
  //   const dob = profile.user.dob;
  //   const pan = profile.user.pan;
  //   const accountType = profile.user.accType;
  //   const accountNumber = profile.user.accNo;
  //   const ifsc = profile.user.ifsc;
  //   const fullName = `${firstName} ${lastName}`;
  //   const addressLine1 = profile.user.add;
  //   const addressLine2 = "ADD2";
  //   const addressLine3 = "ADD3";
  //   const city = profile.user.city;
  //   const state = profile.user.state;
  //   const postalCode = profile.user.pin;
  //   const country = "INDIA";
  //   const mobile = profile.user.mobile;
  //   const email = profile.user.email;
  //   const fatherName = profile.user.n_name;
  //   const relationship = profile.user.father;
  //   const occupation = "100";

  //   const param = `${regnId}|${firstName}|${middleName}|${lastName}|01|${gender}|${dob}|01|SI|||||||||||||N||||${pan}||||||||P||||||||${accountType}|${accountNumber}||${ifsc}|Y|||||||||||||||||||||${fullName}|01|${addressLine1}|${addressLine2}|${addressLine3}|${city}|${state}|${postalCode}|${country}|${mobile}||||${email}|M||||||||||||${mobile}|${fatherName}|${relationship}|${occupation}|N|||||||||||||||E||||||||||||Y||Z|||SE|SE|Y|O||||||||||||||`;

  //   const data = {
  //     UserId: userId,
  //     MemberCode: memberCode,
  //     Password: password,
  //     RegnType: regnType,
  //     Param: param,
  //     Filler2: "",
  //   };

  //   axios
  //     .post(url, data, { headers })
  //     .then((response) => {
  //       console.warn(response.data.Remarks);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   navigation.dispatch(StackActions.replace("Home"));
  //   setIsLoggedIn(true);
  // };

  ///////////////////////////////////////////////////////////////////////////

  const handleUserRegistration = async () => {
    try {
      const otpResponse = await sendXManRequest();

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
      const phoneNumber = "918600338741"; // Replace with the actual phone number
      const channel = "SMS";
      const otpResponse = await sendUccRequest();

      console.log("Response from OTP service:", otpResponse);
    } catch (error) {
      console.error("Failed to request OTP:", error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////

  const FATCAUpload = () => {
    const password = () => {
      let data =
        '\n<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"\n               xmlns:ns="http://bsestarmfdemo.bseindia.com/2016/01/">\n   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">\n      <wsa:Action>http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/getPassword</wsa:Action>\n      <wsa:To>https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure</wsa:To>\n   </soap:Header>\n   <soap:Body>\n      <ns:getPassword>\n         <ns:UserId>5526901</ns:UserId>\n         <ns:MemberId>55269</ns:MemberId>\n         <ns:Password>Pass@12345</ns:Password>\n         <ns:PassKey>india2024</ns:PassKey>\n      </ns:getPassword>\n   </soap:Body>\n</soap:Envelope>\n\n';

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure",
        headers: {
          "Content-Type": "application/soap+xml",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.error("Error parsing XML:", err);
            } else {
              try {
                // Navigate through the parsed object to extract the value
                const getPasswordResult =
                  result["s:Envelope"]["s:Body"][0]["getPasswordResponse"][0][
                    "getPasswordResult"
                  ][0];
                const value = getPasswordResult.split("|")[1];
                setFaPass(value);
                console.log(value);
              } catch (error) {
                console.error("Error extracting getPasswordResult:", error);
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    password();

    const FatUp = () => {
      const firstName = profile.user.firstName;
      const ePass = faPass;
      const dob = profile.user.dob;
      const pan = profile.user.pan;
      const city = profile.user.city;

      let data = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://bsestarmfdemo.bseindia.com/2016/01/">\n   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">\n      <wsa:Action>http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/MFAPI</wsa:Action>\n      <wsa:To>https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure</wsa:To>\n   </soap:Header>\n   <soap:Body>\n      <ns:MFAPI>\n         <ns:Flag>01</ns:Flag>\n         <ns:UserId>5526901</ns:UserId>\n         <ns:EncryptedPassword>${ePass}</ns:EncryptedPassword>\n         <ns:param>${pan}||${firstName}|03/29/1996|||01|P|1|${city}|IN|IN|${pan}|C||||||||||01||32|||N|02|S|||||||||||B|N||||||||||||||||||||||||||N|N||N|||</ns:param>\n      </ns:MFAPI>\n   </soap:Body>\n</soap:Envelope>\n`;

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure",
        headers: {
          "Content-Type": "application/soap+xml",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    FatUp();
  };

  ///////////////////////////////////////////////////////////////////////

  const getMan = async () => {
    const ManPas = () => {
      const url =
        "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure";

      const headers = {
        "Content-Type": "application/soap+xml",
      };

      // Replace these values with your actual login credentials
      const userId = "5526901";
      const memberId = "55269";
      const password = "Pass@12345";
      const passkey = "india2024";

      // Create the SOAP request
      const soapRequest = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"  
               xmlns:ns="http://bsestarmfdemo.bseindia.com/2016/01/">
   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
      <wsa:Action>http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/getPassword</wsa:Action>
      <wsa:To>https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure</wsa:To>
   </soap:Header>
   <soap:Body>
      <ns:getPassword>
         <ns:UserId>${userId}</ns:UserId>
         <ns:MemberId>${memberId}</ns:MemberId>
         <ns:Password>${password}</ns:Password>
         <ns:PassKey>${passkey}</ns:PassKey>
      </ns:getPassword>
   </soap:Body>
</soap:Envelope>
`;

      axios
        .post(url, soapRequest, { headers })
        .then((response) => {
          console.log(JSON.stringify(response.data));
          parseString(response.data, (err, result) => {
            if (err) {
              console.error("Error parsing XML:", err);
            } else {
              try {
                // Navigate through the parsed object to extract the value
                const getPasswordResult =
                  result["s:Envelope"]["s:Body"][0]["getPasswordResponse"][0][
                    "getPasswordResult"
                  ][0];
                const resultValue = getPasswordResult.split("|")[1];
                setResult(resultValue);
                console.log(resultValue);
              } catch (error) {
                console.error("Error extracting getPasswordResult:", error);
              }
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    ManPas();

    const regnId = profile.user.mobile;
    const accountType = profile.user.accType;
    const accountNumber = profile.user.accNo;

    console.log(accountNumber);
    const ifsc = profile.user.ifsc;

    let flag = "06";
    let userId = "5526901";
    let encryptedPassword = result;
    let param = `${regnId}|500000|X|${accountNumber}|${accountType}|${ifsc}||08/08/2024|01/02/2054`;

    let data = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://bsestarmfdemo.bseindia.com/2016/01/">
   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
      <wsa:Action>http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/MFAPI</wsa:Action>
      <wsa:To>https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure</wsa:To>
   </soap:Header>
   <soap:Body>
      <ns:MFAPI>
         <!--Optional:-->
         <ns:Flag>${flag}</ns:Flag>
         <!--Optional:-->
         <ns:UserId>${userId}</ns:UserId>
         <!--Optional:-->
         <ns:EncryptedPassword>${encryptedPassword}</ns:EncryptedPassword>
         <!--Optional:-->
         <ns:param>${param}</ns:param>
      </ns:MFAPI>
   </soap:Body>
</soap:Envelope>`;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure",
      headers: {
        "Content-Type": "application/soap+xml",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.warn(response.data);

        parseString(response.data, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
          } else {
            try {
              // Navigate through the parsed object to extract the value
              const getPasswordResult =
                result["s:Envelope"]["s:Body"][0]["MFAPIResponse"][0][
                  "MFAPIResult"
                ][0];
              const value = getPasswordResult.split("|")[1];
              setFaPass(value);
              console.warn(value);
            } catch (error) {
              console.error("Error extracting getPasswordResult:", error);
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        <ListButton title="Create UCC" handelSubmit={requestUccForUser} />
        <ListButton title="FATCA" handelSubmit={FATCAUpload} />
        <ListButton title="Create Mandate" handelSubmit={getMan} />
        <ListButton
          title="Setup AutoPay"
          handelSubmit={() => navigation.navigate("AutoPay")}
        />
        <ListButton title="Help & Support" handelSubmit={requestOtpForUser} />

        <ListButton title="Logout" handelSubmit={requestUccForUser} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default Account;
