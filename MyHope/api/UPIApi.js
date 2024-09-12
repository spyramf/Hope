import axios from "axios";
import {
  UserId,
  MemberCode,
  Password,
  ApiKey,
  DirectPayUrl,
} from "./bseLogin";

const sendUPIApiRequest = async () => {
  try {
    let data = JSON.stringify({
      LoginId: UserId,
      Password: Password,
      membercode: MemberCode,
      clientcode: "IW50078199",
      modeofpayment: "UPI",
      bankid: "UTI",
      accountnumber: "914010019699759",
      ifsc: "UTIB0000615",
      ordernumber: "1361521325",
      totalamount: "1000",  // Set this value correctly if needed
      internalrefno: "1234569878",
      NEFTreference: "1",
      mandateid: "",
      vpaid: "pgangurde29@ybl",
      loopbackURL: "",
      allowloopBack: "",
      filler1: "",
      filler2: "",
      filler3: "",
      filler4: "",
      filler5: "",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: DirectPayUrl,
      headers: {
        "Content-Type": "application/json",
        APIKEY: ApiKey,
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("Payment request sent successfully:", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error in setting up the request:", error.message);
    }
    throw error;
  }
};

module.exports = sendUPIApiRequest;
