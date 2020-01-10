import { auth } from "../Constants";
import axios, { setAuthToken } from "../../axios_instance";
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
  payloads: { user, token }
});

export const logout = () => {
  localStorage.removeItem("token");
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
    dispatch(signup_success(responseData.token));
    dispatch(showAlert(responseData.message, "success"));
    dispatch(checkUserIsAuthenticate());
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    dispatch(failed(message));
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
    localStorage.setItem("token", responseData.token);
    dispatch(login_success(responseData.token));
    dispatch(checkUserIsAuthenticate());
  } catch (err) {
    const error = err.response.data.errors;
    if (error) dispatch(showAlert(error.message, "warning"));
    dispatch(failed(error.message));
  }
};

///////////////////////////////
/////// CHECK AUTHENTICATION
///////////////////////////////////
export const checkUserIsAuthenticate = () => async dispatch => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
    try {
      const user = await axios.get("/auth", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await user.data;
      dispatch(fetch_user(userData.user, token));
    } catch (err) {}
  }
};
