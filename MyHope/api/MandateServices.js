import axios from "axios";
import { parseString } from "xml2js";
import {
  UserId,
  Password,
  PassKey,
  XSipPassUrl,
  XSipOrderUrl,
  MemberCode,
  ManFatPassUrl,
} from "./bseLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sendXManRequest = async () => {

  const Log = await AsyncStorage.getItem("LoginData");
  const parsedLog = JSON.parse(Log);
  console.log(parsedLog);
  // const param = `${parsedLog.user.mobile}|500000|X|${parsedLog.user.accNo}|${parsedLog.user.accType}|${parsedLog.user.ifsc}||18/08/2024|01/02/2054`;
const param = "IW50078199|1000000|X|914010019699759|SB|UTIB0000615||22/08/2024|01/02/2054";
  try {
    // API 1
    const dataPass = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.bsestarmf.in/2016/01/">
   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
      <wsa:Action>http://www.bsestarmf.in/2016/01/IStarMFWebService/getPassword</wsa:Action>
      <wsa:To>${ManFatPassUrl}</wsa:To>
   </soap:Header>
   <soap:Body>
      <ns:getPassword>
         <ns:UserId>${UserId}</ns:UserId>
         <ns:MemberId>${MemberCode}</ns:MemberId>
         <ns:Password>${Password}</ns:Password>
         <ns:PassKey>${PassKey}</ns:PassKey>
      </ns:getPassword>
   </soap:Body>
</soap:Envelope>
`;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: ManFatPassUrl,
      headers: {
        "Content-Type": "application/soap+xml",
      },
      data: dataPass,
    };

    const response = await axios.request(config);
    console.log("Response data from getPassword:", response.data);

    const parsedResponse = await new Promise((resolve, reject) => {
      parseString(response.data, (err, result) => {
        if (err) {
          reject("Error parsing XML: " + err);
        } else {
          try {
            console.log("Parsed XML for getPassword:", result);
            const getPasswordResult =
              result["s:Envelope"]["s:Body"][0]["getPasswordResponse"][0][
                "getPasswordResult"
              ][0];
            const value = getPasswordResult.split("|")[1]; // Extract the value
            resolve(value);
          } catch (error) {
            reject("Error extracting getPasswordResult: " + error);
          }
        }
      });
    });
console.log(parsedResponse);
    console.log("Extracted value from getPassword:", parsedResponse);





const data = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.bsestarmf.in/2016/01/">
   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
      <wsa:Action>http://www.bsestarmf.in/2016/01/IStarMFWebService/MFAPI</wsa:Action>
      <wsa:To>${ManFatPassUrl}</wsa:To>
   </soap:Header>
   <soap:Body>
      <ns:MFAPI>
         <ns:Flag>06</ns:Flag>
         <ns:UserId>${UserId}</ns:UserId>
         <ns:EncryptedPassword>${parsedResponse}</ns:EncryptedPassword>
         <ns:param>${param}</ns:param>
      </ns:MFAPI>
   </soap:Body>
</soap:Envelope>
`;
const configData = {
  method: "post",
  maxBodyLength: Infinity,
  url: ManFatPassUrl,
  headers: {
    "Content-Type": "application/soap+xml",
  },
  data: data,
};

const responseMan = await axios.request(configData);
console.log("Response data from getPassword:", responseMan.data);





    const parsedResponseData = await new Promise((resolve, reject) => {
      parseString(responseMan.data, (err, result) => {
        if (err) {
          reject("Error parsing XML: " + err);
        } else {
          try {
            console.log("Parsed XML for getPassword:", result);
            const getMFAPIResponse =
              result["s:Envelope"]["s:Body"][0]["MFAPIResponse"][0][
                "MFAPIResult"
              ][0];
            const value = getMFAPIResponse.split("|")[1]; // Extract the value
            resolve(value);
          } catch (error) {
            reject("Error extracting getPasswordResult: " + error);
          }
        }
      });
    });
    console.log(parsedResponseData);
    console.log("Extracted value from getPassword:", parsedResponseData);
  
    return responseMan.data;
  } catch (error) {
    console.error("Error in sendXSipRequest:", error);
    throw error;
  }
};

module.exports = sendXManRequest;
