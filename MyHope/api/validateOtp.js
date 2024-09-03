import axios from "axios";

const validateOtp = async ({ verificationId, code, mobileNumber }) => {
  try {
    const options = {
      method: "GET",
      url: "https://cpaas.messagecentral.com/verification/v3/validateOtp",
      params: {
        countryCode: "91",
        mobileNumber: mobileNumber,
        verificationId: verificationId,
        customerId: "C-FF70E147110945E",
        code: code,
      },
      headers: {
        authToken:
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUZGNzBFMTQ3MTEwOTQ1RSIsImlhdCI6MTcyNDkxNTA3OCwiZXhwIjoxODgyNTk1MDc4fQ.1iObgKOyHd3Bmv4ZZVz_2azqcSb09rF8XYJJISa3ZBc_cCYYlyYUQrvL3_Kxcz21e-niLKyLrS1mUI8i9si9kQ",
      },
    };

    const response = await axios(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error validating OTP:",
      error.response ? error.response.data : error.message
    );
  }
};

module.exports = validateOtp;
