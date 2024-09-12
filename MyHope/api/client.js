import axios from "axios";

const client = axios.create({
  baseURL: "http://82.112.227.14:8000", // Replace with your backend IP/URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
