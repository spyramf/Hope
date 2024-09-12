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



const sendXSipRequest = async ({
  SchemeCode,
  ucc,
  StartDate,
  FrequencyType,
  InstallmentAmount,
  MandateID,
  UniqueRefNo,
  InternalRefNo,
}) => {
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
          <wsa:Action>http://bsestarmf.in/MFOrderEntry/xsipOrderEntryParam</wsa:Action>
          <wsa:To>https://bsestarmf.in/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
        </soap:Header>
        <soap:Body>
          <bses:xsipOrderEntryParam>
            <bses:TransactionCode>NEW</bses:TransactionCode>
            <bses:UniqueRefNo>${UniqueRefNo}</bses:UniqueRefNo>
            <bses:SchemeCode>${SchemeCode}</bses:SchemeCode>
            <bses:MemberCode>${MemberCode}</bses:MemberCode>
            <bses:ClientCode>${ucc}</bses:ClientCode>
            <bses:UserId>${UserId}</bses:UserId>
            <bses:InternalRefNo>${InternalRefNo}</bses:InternalRefNo>
            <bses:TransMode>P</bses:TransMode>
            <bses:DpTxnMode>P</bses:DpTxnMode>
            <bses:StartDate>${StartDate}</bses:StartDate>
             <bses:EndDate>${StartDate}</bses:EndDate>
            <bses:FrequencyType>${FrequencyType}</bses:FrequencyType>
            <bses:FrequencyAllowed>1</bses:FrequencyAllowed>
            <bses:InstallmentAmount>${InstallmentAmount}</bses:InstallmentAmount>
            <bses:NoOfInstallment>9999</bses:NoOfInstallment>
            <bses:Remarks></bses:Remarks>
            <bses:FolioNo></bses:FolioNo>
            <bses:FirstOrderFlag>Y</bses:FirstOrderFlag>
            <bses:Brokerage></bses:Brokerage>
            <bses:MandateID>${MandateID}</bses:MandateID>
            <bses:SubberCode></bses:SubberCode>
            <bses:Euin></bses:Euin>
            <bses:EuinVal>N</bses:EuinVal>
            <bses:DPC>Y</bses:DPC>
            <bses:XsipRegID></bses:XsipRegID>
            <bses:IPAdd></bses:IPAdd>
            <bses:Password>${parsedResponse}</bses:Password>
            <bses:PassKey>${PassKey}</bses:PassKey>
            <bses:Param1></bses:Param1>
            <bses:Param2></bses:Param2>
            <bses:Param3></bses:Param3>
            <bses:Filler1></bses:Filler1>
            <bses:Filler2></bses:Filler2>
            <bses:Filler3></bses:Filler3>
            <bses:Filler4></bses:Filler4>
            <bses:Filler5></bses:Filler5>
            <bses:Filler6></bses:Filler6>
          </bses:xsipOrderEntryParam>
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
            const getXSipOrderEntryParamResult =
              result["s:Envelope"]["s:Body"][0][
                "xsipOrderEntryParamResponse"
              ][0]["xsipOrderEntryParamResult"][0];
            resolve(getXSipOrderEntryParamResult);
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

module.exports = sendXSipRequest;
