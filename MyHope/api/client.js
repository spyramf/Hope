<<<<<<< HEAD
import axios from "axios;
export default axios.create({ baseURL: "http://82.112.227.14:8000/" });
=======
import axios from "axios";

const client = axios.create({
  baseURL: "http://82.112.227.14:8000", // Replace with your backend IP/URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
>>>>>>> 82ea59f3f6b532998b6970e61cf510b58048c37e
