import { auth } from "../Constants";
import axios from "../../axios_instance";
import { showAlert } from "./alert";

// headers
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

// loading
const loading = () => ({ type: auth.AUTH_LOADING });

// register success
const register_success = token => {
  return {
    type: auth.AUTH_REGISTER_SUCCESS,
    payloads: token
  };
};

// register Failed
const register_failed = () => {
  return {
    type: auth.AUTH__REGISTER_FAILED
  };
};

// register success
const login_success = token => {
  return {
    type: auth.AUTH_LOGIN_SUCCESS,
    payloads: token
  };
};

///////////////////////////////
/////// LOGOUT
///////////////////////////////////
export const logout = () => {
  localStorage.clearItem();
  return {
    type: auth.AUTH_LOGOUT
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
    dispatch(register_success(responseData.token));
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
    dispatch(login_success(responseData.token));
  } catch (err) {
    const error = err.response.data.errors;
    if (error) dispatch(showAlert(error.message, "warning"));
    console.log("error", err);
  }
};

///////////////////////////////
/////// CHECK AUTHENTICATION
///////////////////////////////////

const checkUserIsAuthenticate = () => dispatch => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch();
  } else {
    dispatch(logout());
  }
};
