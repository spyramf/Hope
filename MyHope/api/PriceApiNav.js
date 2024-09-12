import axios from "axios";
import { Alert } from "react-native";

const PriceApiNav = async () => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.mfapi.in/mf/149132/latest",
    };

    // Make the API request
    const response = await axios.request(config);

    // Log and return the response data
    console.log(response.data);
  

    // Return the data so that the calling function can access it
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

module.exports = PriceApiNav;
