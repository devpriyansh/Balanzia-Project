import axios from "axios";

const api = axios.create({
  baseURL: "https://balanzia-backend.onrender.com/api",
  withCredentials: true, //to send cookies with request
});

export default api;
