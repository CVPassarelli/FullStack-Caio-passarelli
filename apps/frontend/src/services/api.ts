import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // ajuste para sua API
});

export default api;
