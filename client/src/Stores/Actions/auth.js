import { auth } from "../Constants";
import axios from "axios";
import setAuthToken from "../../_helper/setAuthToken";
import { showAlert } from "./alert";

const loading = () => ({ type: auth.AUTH_START });

const failed = error => ({ type: auth.AUTH_FAILED, payloads: error });

const login_success = token => ({
  type: auth.AUTH_LOGIN_SUCCESS,
  payloads: token
});

const signup_success = token => ({
  type: auth.AUTH_REGISTER_SUCCESS,
  payloads: token
});

const fetch_user = (user, token) => ({
  type: auth.AUTH_FETCH_USER,
  payloads: { user: user, token: token }
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expireDate");
  return {
    type: auth.AUTH_LOGOUT
  };
};

// Check time out
const checkTimeout = timeout => {
  return dispatch => {
    setTimeout(() => {
      logout();
    }, timeout * 1000);
  };
};

/********
 * USER REGISTRATION
 ***********************/
export const userRegistration = inputdata => async dispatch => {
  dispatch(loading());
  try {
    const response = await axios.post("/api/user/signup", inputdata);
    const responseData = await response.data;
    const timeout = new Date(
      new Date().getTime() + responseData.expiresIn * 1000
    );

    localStorage.setItem("token", responseData.token);
    localStorage.setItem("expireDate", timeout);
    dispatch(signup_success(responseData.token));
    dispatch(checkTimeout(responseData.expiresIn));
    dispatch(checkUserIsAuthenticate());
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    dispatch(failed(message));
  }
};

/********
 * USER AUTHENTICATION
 ***********************/
export const userLogin = inputdata => async dispatch => {
  dispatch(loading());
  try {
    const response = await axios.post("/api/user", inputdata);
    const responseData = await response.data;
    const timeout = new Date(
      new Date().getTime() + responseData.expiresIn * 1000
    );

    localStorage.setItem("token", responseData.token);
    localStorage.setItem("expireDate", timeout);
    dispatch(login_success(responseData.token));
    dispatch(checkTimeout(responseData.expiresIn));
    dispatch(checkUserIsAuthenticate());
  } catch (err) {
    const error = err.response.data.errors;
    if (error) dispatch(showAlert(error.message, "warning"));
    dispatch(failed(error.message));
  }
};

/********
 * CHECK USER IS ATHENTICATED
 ***********************/
export const checkUserIsAuthenticate = () => async dispatch => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    setAuthToken(token);
    console.log("action check");
    const timeout = new Date(localStorage.expireDate);
    if (timeout <= new Date()) {
      dispatch(logout());
    } else {
      try {
        const user = await axios.get("/api/user");
        const userData = await user.data;
        dispatch(fetch_user(userData.user, token));
        dispatch(
          checkTimeout(
            new Date(timeout.getTime() - new Date().getTime()) / 1000
          )
        );
      } catch (err) {}
    }
  }
};

/************
 * Get All Users
 *****************/
export const getAllUsers = () => async dispatch => {
  try {
    const response = await await axios.get("/api/user/all");
    const { users } = await response.data;
    dispatch({
      type: auth.ALL_USERS,
      payloads: users
    });
  } catch (err) {
    const error = err.response.data.errors;
    if (error) dispatch(showAlert(error.message, "warning"));
    dispatch(failed(error.message));
  }
};
