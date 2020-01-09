import { USER } from "../Constants";
import axios, { setAuthToken } from "../../axios_instance";
import { showAlert } from "./alert";

// headers
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

// loading
const loading = () => ({ type: USER.USER_LOADING });

// success
const success = token => {
  return {
    type: USER.USER_SUCCESS,
    payloads: token
  };
};

// fetch user
const fetch = user => {
  return {
    type: USER.USER_FETCH,
    payloads: user
  };
};
///////////////////////////////
/////// LOGOUT
///////////////////////////////////
export const logout = () => {
  localStorage.clear();
  return {
    type: USER.USER_LOGOUT
  };
};

///////////////////////////////
/////// USER REGISTRATION
///////////////////////////////////
export const userRegistration = inputdata => async dispatch => {
  dispatch(loading());
  try {
    const response = await axios.post("/user", inputdata);
    const responseData = await response.data;
    localStorage.setItem("token", responseData.token);
    dispatch(success(responseData.token));
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    console.log("error", err);
  }
};

///////////////////////////////
/////// USER lOGIN
///////////////////////////////////
export const userLogin = inputdata => async dispatch => {
  dispatch(loading());
  try {
    const response = await axios.post("/auth", inputdata);
    const responseData = await response.data;
    console.log("response", responseData);
    localStorage.setItem("token", responseData.token);
    dispatch(success(responseData.token));
  } catch (err) {
    const error = err.response.data.errors;
    if (error) dispatch(showAlert(error.message, "warning"));
    console.log("error", err);
  }
};

///////////////////////////////
/////// CHECK AUTHENTICATION
///////////////////////////////////
export const checkUserIsAuthenticate = () => async dispatch => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  try {
    const user = await axios.get("/auth");
    const userData = await user.data;
    dispatch(fetch(userData.user));
  } catch (err) {}
};
