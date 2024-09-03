import axios from "axios";

const sendCentralRequest = async (mobileNumber) => {
  try {
    const options = {
      method: "POST",
      url: "https://cpaas.messagecentral.com/verification/v3/send",
      params: {
        countryCode: "91", // Fixed country code
        customerId: "C-FF70E147110945E", // Fixed customer ID
        flowType: "SMS", // Fixed flow type
        mobileNumber: mobileNumber, // Variable mobile number
      },
      headers: {
        authToken:
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUZGNzBFMTQ3MTEwOTQ1RSIsImlhdCI6MTcyNDkxNTA3OCwiZXhwIjoxODgyNTk1MDc4fQ.1iObgKOyHd3Bmv4ZZVz_2azqcSb09rF8XYJJISa3ZBc_cCYYlyYUQrvL3_Kxcz21e-niLKyLrS1mUI8i9si9kQ", // Fixed auth token
      },
    };

    const response = await axios(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending request:",
      error.response ? error.response.data : error.message
    );
  }
};

// Export the function so it can be used in other files
module.exports = sendCentralRequest;
