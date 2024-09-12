import axios from "axios";
import { UserId,MemberCode,Password,PassKey,ApiKey,UccUrl } from "./bseLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sendUccRequest = async () => {

const Log = await AsyncStorage.getItem("LoginData");
const parsedLog = JSON.parse(Log);
const n_pan = parsedLog.user.accNo;
// console.log(Log);
// console.log(n_pan);

const address = parsedLog.user.add;

// console.log("Original Address:", address);

// console.log("Original Address:", parsedLog.user.accType);

function splitAddress(address) {
  let add1 = "";
  let add2 = "";
  let add3 = "";

  // Limit the first 30 characters but break at the nearest space
  if (address.length > 40) {
    const firstPart = address.slice(0, 40);
    const lastSpaceIndex = firstPart.lastIndexOf(" ");

    add1 = address.slice(0, lastSpaceIndex).trim(); // Take until the last space within 30 chars
    address = address.slice(lastSpaceIndex + 1).trim(); // Remaining address after the first part
  } else {
    add1 = address.trim(); // If it's less than 30 characters, assign all to add1
    address = "";
  }

  // Do the same for the next 30 characters
  if (address.length > 30) {
    const secondPart = address.slice(0, 30);
    const lastSpaceIndex = secondPart.lastIndexOf(" ");

    add2 = address.slice(0, lastSpaceIndex).trim(); // Take until the last space within the next 30 chars
    address = address.slice(lastSpaceIndex + 1).trim(); // Remaining address after the second part
  } else {
    add2 = address.trim(); // If less than 30 characters, assign all to add2
    address = "";
  }

  // Whatever remains, put it in add3
  add3 = address.trim();

  return { add1, add2, add3 };
}

const { add1, add2, add3 } = splitAddress(address);

// console.log("Address Part 1:", add1);
// console.log("Address Part 2:", add2);
// console.log("Address Part 3:", add3);

try {
  let data = JSON.stringify({
    UserId: UserId,
    MemberCode: MemberCode,
    Password: Password,
    RegnType: "NEW",
    Param: `${parsedLog.user.ucc}|${parsedLog.user.firstName}||${parsedLog.user.lastName}|${parsedLog.user.taxStatus}|${parsedLog.user.gender}|${parsedLog.user.dob}|${parsedLog.user.occupation}|SI|||||||||||||N||||${parsedLog.user.pan}||||||||P||||||||${parsedLog.user.accType}|${parsedLog.user.accNo}||${parsedLog.user.ifsc}|Y|||||||||||||||||||||${parsedLog.user.firstName}|01|${add1}|${add2}|${add3}|${parsedLog.user.city}|${parsedLog.user.state}|${parsedLog.user.pin}|INDIA|${parsedLog.user.mobile}||||${parsedLog.user.email}|M||||||||||||${parsedLog.user.mobile}|${parsedLog.user.n_name}|${parsedLog.user.n_relation}|100|N|||||||||||||||E||||||||||||Y||Z|||SE|SE|Y|O||||||||||||||`,
  });

  // Now make your API request using this sanitized data

    
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: UccUrl,
      headers: {
        "Content-Type": "application/json",
        APIKEY: ApiKey,
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("OTP sent successfully:", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; 
  }
};

module.exports = sendUccRequest;
