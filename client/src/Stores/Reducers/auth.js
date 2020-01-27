import { auth } from "../Constants";
import updateObject from "../../_helper/updateObject";

const initState = {
  users: [],
  user: null,
  token: null,
  error: null,
  isAuth: false,
  loading: false
};

const loading = (state, payloads) => updateObject(state, { loading: true });

const failed = (state, payloads) =>
  updateObject(state, { loading: false, errors: payloads });

const success = (state, payloads) =>
  updateObject(state, {
    loading: false,
    isAuth: true,
    token: payloads
  });

const fetchUser = (state, payloads) =>
  updateObject(state, {
    loading: false,
    user: payloads.user,
    token: payloads.token,
    isAuth: true
  });

const logout = (state, payloads) =>
  updateObject(state, {
    loading: false,
    user: null,
    token: null,
    isAuth: false
  });

const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case auth.AUTH_START:
      return loading(state, payloads);
    case auth.AUTH_FAILED:
      return failed(state, payloads);
    case auth.AUTH_LOGIN_SUCCESS:
    case auth.AUTH_REGISTER_SUCCESS:
      return success(state, payloads);
    case auth.AUTH_FETCH_USER:
      return fetchUser(state, payloads);
    case auth.AUTH_LOGOUT:
      return logout(state, payloads);
    case auth.ALL_USERS:
      return {
        ...state,
        users: payloads
      };
    default:
      return state;
  }
};

export default reducer;
