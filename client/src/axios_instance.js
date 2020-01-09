import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: {
    Authorization: `Bearer ${localStorage.token}`
  }
});

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    // axios.interceptors.request.use(function(config) {
    //   config.headers.Authorization = `Bearer ${token}`;
    //   return config;
    // });
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default instance;
