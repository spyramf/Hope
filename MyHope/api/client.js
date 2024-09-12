import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.1.37:8000", // Replace with your backend IP/URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
