import { auth } from "../Constants";
import StateUpdater from "../../_helper/StateUpdater";

const initState = {
  user: null,
  token: null,
  isAuthenticated: null,
  loading: false
};

//// LOADING ////
const loading = (state, payloads) => StateUpdater(state, { loading: true });

//// REGISTER SUCCESS ////
const register_success = (state, payloads) =>
  StateUpdater(state, {
    loading: false,
    token: payloads,
    isAuthenticated: true
  });

//// REGISTER FAILED ////
const register_failed = (state, payloads) =>
  StateUpdater(state, {
    loading: false,
    user: null,
    token: null,
    isAuthenticated: false
  });

//// LOGIN SUCCESS ////
const login_success = (state, payloads) =>
  StateUpdater(state, {
    loading: false,
    token: payloads,
    isAuthenticated: true
  });

// logout
const logout = (state, payloads) =>
  StateUpdater(state, { user: null, token: null, isAuthenticated: false });

const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case auth.AUTH_LOADING:
      return loading(state, payloads);
    case auth.AUTH_LOGIN_SUCCESS:
      return login_success(state, payloads);
    case auth.AUTH_REGISTER_SUCCESS:
      return register_success(state, payloads);
    case auth.AUTH__REGISTER_FAILED:
      return register_failed(state, payloads);
    case auth.AUTH_LOGOUT:
      return logout(state, payloads);
    default:
      return state;
  }
};

export default reducer;
