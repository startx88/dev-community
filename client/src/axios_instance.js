import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: {
    Authorization: `Bearer ${localStorage.token}`
  }
});

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.interceptors.request.use(function(config) {
      console.log(config);
    });
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default instance;
