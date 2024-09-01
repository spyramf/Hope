import axios from "axios";
import { UserId,MemberCode,Password,PassKey,ApiKey,UccUrl } from "./bseLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sendUccRequest = async () => {

const Log = await AsyncStorage.getItem("LoginData");
const parsedLog = JSON.parse(Log);
const n_pan = parsedLog.user.accNo;
console.log(Log);
console.log(n_pan);

  try {
    let data = JSON.stringify({
      UserId: UserId,
      MemberCode: MemberCode,
      Password: Password,
      RegnType: "NEW",
      Param: `${parsedLog.user.mobile}|${parsedLog.user.firstName}||${parsedLog.user.lastName}|01|M|${parsedLog.user.dob}|01|SI|||||||||||||N||||${parsedLog.user.pan}||||||||P||||||||${parsedLog.user.accType}|${parsedLog.user.accNo}||${parsedLog.user.ifsc}|Y|||||||||||||||||||||${parsedLog.user.firstName}|01|${parsedLog.user.add}|ADD2|ADD3|${parsedLog.user.city}|${parsedLog.user.state}|${parsedLog.user.pin}|INDIA|${parsedLog.user.mobile}||||${parsedLog.user.email}|M||||||||||||${parsedLog.user.mobile}|${parsedLog.user.n_name}|${parsedLog.user.n_relation}|100|N|||||||||||||||E||||||||||||Y||Z|||SE|SE|Y|O||||||||||||||`,
      Filler2: "",
    });

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
