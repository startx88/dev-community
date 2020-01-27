import axios from "axios";

// set authorization
export const setAuthToken = token => {
  if (token) {
    console.log("hello", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios.defaults.headers.common["withCredentials"] = true;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    //axios.defaults.headers.common["withCredentials"] = false;
  }
};

export default setAuthToken;
