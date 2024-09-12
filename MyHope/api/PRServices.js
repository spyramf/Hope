import axios from "axios";
import { parseString } from "xml2js";
import {
  UserId,
  Password,
  PassKey,
  XSipPassUrl,
  XSipOrderUrl,
  MemberCode,
} from "./bseLogin";



const sendPRequest = async ({ ucc, SchemeCode, OrderVal, TransNo }) => {
  try {
    // API 1
    const dataPass = `
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
                     xmlns:bses="http://bsestarmf.in/">
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
          <wsa:Action>${XSipPassUrl}</wsa:Action>
          <wsa:To>${XSipOrderUrl}</wsa:To>
        </soap:Header>
        <soap:Body>
          <bses:getPassword>
            <bses:UserId>${UserId}</bses:UserId>
            <bses:Password>${Password}</bses:Password>
            <bses:PassKey>${PassKey}</bses:PassKey>
          </bses:getPassword>
        </soap:Body>
      </soap:Envelope>
    `;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: XSipOrderUrl,
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

    console.log("Extracted value from getPassword:", parsedResponse);

    const dataSip = `
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
          <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
              <wsa:Action>http://bsestarmf.in/MFOrderEntry/orderEntryParam</wsa:Action>
              <wsa:To>https://www.bsestarmf.in/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
          </soap:Header>
          <soap:Body>
              <bses:orderEntryParam>
                  <bses:TransCode>NEW</bses:TransCode>
                  <bses:TransNo>${TransNo}</bses:TransNo>
                  <bses:OrderId/>
                  <bses:UserID>${UserId}</bses:UserID>
                  <bses:MemberId>${MemberCode}</bses:MemberId>
                  <bses:ClientCode>${ucc}</bses:ClientCode>
                  <bses:SchemeCd>${SchemeCode}</bses:SchemeCd>
                  <bses:BuySell>P</bses:BuySell>
                  <bses:BuySellType>FRESH</bses:BuySellType>
                  <bses:DPTxn>P</bses:DPTxn>
                  <bses:OrderVal>${OrderVal}</bses:OrderVal>
                  <bses:Qty/>
                  <bses:AllRedeem>N</bses:AllRedeem>
                  <bses:FolioNo/>
                  <bses:Remarks/>
                  <bses:KYCStatus>Y</bses:KYCStatus>
                  <bses:RefNo/>
                  <bses:SubBrCode/>
                  <bses:EUIN/>
                  <bses:EUINVal>N</bses:EUINVal>
                  <bses:MinRedeem>N</bses:MinRedeem>
                  <bses:DPC>Y</bses:DPC>
                  <bses:IPAdd/>
                  <bses:Password>${parsedResponse}</bses:Password>
                  <bses:PassKey>${PassKey}</bses:PassKey>
                  <bses:Parma1/>
                  <bses:Param2/>
                  <bses:Param3/>
                  <bses:MobileNo/>
                  <bses:EmailID/>
                  <bses:MandateID/>
                  <bses:Filler1/>
                  <bses:Filler2/>
                  <bses:Filler3/>
                  <bses:Filler4/>
                  <bses:Filler5/>
                  <bses:Filler6/>
              </bses:orderEntryParam>
          </soap:Body>
      </soap:Envelope>
    `;

    const configSip = {
      method: "post",
      maxBodyLength: Infinity,
      url: XSipOrderUrl,
      headers: {
        "Content-Type": "application/soap+xml",
      },
      data: dataSip,
    };

    const responseSip = await axios.request(configSip);
    console.log("Response data from orderEntryParam:", responseSip.data);

    const parsedResponseSip = await new Promise((resolve, reject) => {
      parseString(responseSip.data, (err, result) => {
        if (err) {
          reject("Error parsing XML: " + err);
        } else {
          try {
            console.log("Parsed XML for orderEntryParam:", result);
            const getOrderEntryParamResult =
              result["s:Envelope"]["s:Body"][0]["orderEntryParamResponse"][0][
                "orderEntryParamResult"
              ][0];
               const extractedValue = getOrderEntryParamResult.split("|")[2];
            resolve(extractedValue);
          } catch (error) {
            reject("Error extracting orderEntryParamResult: " + error);
          }
        }
      });
    });

    console.log("Extracted value from orderEntryParam:", parsedResponseSip);

    return parsedResponseSip;
  } catch (error) {
    console.error("Error in sendXSipRequest:", error);
    throw error;
  }
};

module.exports = sendPRequest;
