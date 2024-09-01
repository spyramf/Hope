import { View, Text } from 'react-native'
import React, { useState } from "react";
import axios from "axios";
const parseString = require("xml2js-parser").parseString;

export default function FatComponent() {
  const [faPass, setFaPass] = useState();

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




}