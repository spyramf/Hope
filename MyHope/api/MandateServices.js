import axios from "axios";
import { parseString } from "xml2js";
import {
  UserId,
  Password,
  PassKey,
  ManFatPassUrl,
  MemberCode,
} from "./bseLogin";
import { Linking, Alert } from "react-native";

const sendXManRequest = async ({ Flag, param, ClientCode }) => {
  try {
    // Step 1: Request password from getPassword API
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
      </soap:Envelope>`;

    const configPass = {
      method: "post",
      maxBodyLength: Infinity,
      url: ManFatPassUrl,
      headers: {
        "Content-Type": "application/soap+xml",
      },
      data: dataPass,
    };

    // Making the first API call to get the encrypted password
    const response = await axios.request(configPass);
    console.log("Response from getPassword API:", response.data);

    // Parse the XML response from getPassword API
    const encryptedPassword = await new Promise((resolve, reject) => {
      parseString(response.data, (err, result) => {
        if (err) return reject("Error parsing XML: " + err);
        try {
          const getPasswordResult =
            result["s:Envelope"]["s:Body"][0]["getPasswordResponse"][0][
              "getPasswordResult"
            ][0];
          const password = getPasswordResult.split("|")[1]; // Extract the password
          resolve(password);
        } catch (error) {
          reject("Error extracting getPasswordResult: " + error);
        }
      });
    });

    console.log("Extracted encrypted password:", encryptedPassword);

    // Step 2: Send the request to MFAPI using the retrieved password
    const data = `
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.bsestarmf.in/2016/01/">
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
          <wsa:Action>http://www.bsestarmf.in/2016/01/IStarMFWebService/MFAPI</wsa:Action>
          <wsa:To>${ManFatPassUrl}</wsa:To>
        </soap:Header>
        <soap:Body>
          <ns:MFAPI>
            <ns:Flag>${Flag}</ns:Flag>
            <ns:UserId>${UserId}</ns:UserId>
            <ns:EncryptedPassword>${encryptedPassword}</ns:EncryptedPassword>
            <ns:param>${param}</ns:param>
          </ns:MFAPI>
        </soap:Body>
      </soap:Envelope>`;

    const configData = {
      method: "post",
      maxBodyLength: Infinity,
      url: ManFatPassUrl,
      headers: {
        "Content-Type": "application/soap+xml",
      },
      data: data,
    };

    // Making the second API call to MFAPI
    const responseMan = await axios.request(configData);
    console.log("Response from MFAPI:", responseMan.data);

    // Parse the XML response from MFAPI
    const mandateID = await new Promise((resolve, reject) => {
      parseString(responseMan.data, (err, result) => {
        if (err) return reject("Error parsing XML: " + err);
        try {
          const getMFAPIResponse =
            result["s:Envelope"]["s:Body"][0]["MFAPIResponse"][0][
              "MFAPIResult"
            ][0];
          const id = getMFAPIResponse.split("|")[2]; // Extract the mandate ID
          resolve(id);
        } catch (error) {
          reject("Error extracting MFAPIResult: " + error);
        }
      });
    });

    console.log("Extracted mandate ID from MFAPIResult:", mandateID);

    // Step 3: Make request to EMandateAuthURL with the mandate ID
    const fetchEMandateAuthURL = async () => {
      try {
        const dataReg = JSON.stringify({
          MemberCode: MemberCode,
          Password: Password,
          ClientCode: ClientCode,
          UserId: UserId,
          MandateID: mandateID,
        });

        const configReg = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://www.bsestarmf.in/StarMFWebService/StarMFWebService.svc/EMandateAuthURL",
          headers: {
            "Content-Type": "application/json",
            APIKEY: "VmxST1UyRkhUbkpOVldNOQ==",
          },
          data: dataReg,
        };

        const responseReg = await axios.request(configReg);
        console.log("Response from EMandateAuthURL:", responseReg.data);

        return responseReg.data;
      } catch (error) {
        console.error("Error fetching EMandateAuthURL:", error);
        throw error;
      }
    };

    // Function to check mandate status with timeout
    const checkMandateStatus = async () => {
      const timeout = 2 * 60 * 1000; // 2 minutes
      const start = Date.now();

      const interval = setInterval(async () => {
        try {
          const jsonResponse = await fetchEMandateAuthURL();
          console.log("EMandateAuthURL response:", jsonResponse.Status);

          if (jsonResponse.Status === 101) {
            console.log("Status 101: Retrying in 10 seconds...");
          } else if (jsonResponse.Status === 100) {
            clearInterval(interval);
            console.log("Status 100: Opening the URL...");

            const url = jsonResponse.ResponseString;
            try {
              await Linking.openURL(url);
              console.log("URL successfully opened:", url);
            } catch (err) {
              console.error("Error opening URL:", err);
              Alert.alert("Error", "Failed to open the URL.");
            }
          }

          // Stop the loop after 2 minutes
          if (Date.now() - start >= timeout) {
            clearInterval(interval);
            console.log("Request timed out after 2 minutes.");
          }
        } catch (error) {
          clearInterval(interval);
          console.error("Error during mandate status check:", error);
        }
      }, 10000); // Run every 10 seconds
    };

    await checkMandateStatus();
  } catch (error) {
    console.error("Error in sendXManRequest:", error.message || error);
    throw new Error(
      `Failed to complete XMan request. Error: ${error.message || error}`
    );
  }
};

module.exports = sendXManRequest;
