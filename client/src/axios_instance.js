import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4200/api"
});

export default instance;
