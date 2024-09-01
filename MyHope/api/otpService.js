import axios from "axios";
const sendOtpRequest = async ({
  phoneNumber,
  channel,
  expiry = "600",
  otpLength = "4",
  email,

}) => {
  try {
    const data = JSON.stringify({
      phoneNumber,
      channel,
      expiry,
      otpLength,
      email,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://auth.otpless.app/auth/otp/v1/send",
      headers: {
        "Content-Type": "application/json",
        clientSecret: "rkva9a0hhz0joeo9vi8rdbro91xamedu",
        clientId: "NAAQV2F40XAK58YZ2SRCLUJEBJ3LFXED",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("OTP sent successfully:", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

module.exports = sendOtpRequest;
