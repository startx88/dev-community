import { USER } from "../Constants";
import StateUpdater from "../../_helper/StateUpdater";

const initState = {
  user: null,
  token: null,
  isAuthenticated: null,
  loading: false
};

//// LOADING ////
const loading = (state, payloads) => StateUpdater(state, { loading: true });

//// SUCCESS ////
const success = (state, payloads) =>
  StateUpdater(state, {
    loading: false,
    token: payloads
  });

//// LOGIN SUCCESS ////
const login_success = (state, payloads) =>
  StateUpdater(state, {
    loading: false,
    token: payloads,
    isAuthenticated: true
  });

//// LOGIN SUCCESS ////
const fetch = (state, payloads) =>
  StateUpdater(state, {
    loading: false,
    user: payloads,
    isAuthenticated: true
  });

//// LOGOUT ////
const logout = (state, payloads) =>
  StateUpdater(state, { user: null, token: null, isAuthenticated: false });

const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case USER.USER_LOADING:
      return loading(state, payloads);
    case USER.USER_SUCCESS:
      return success(state, payloads);
    case USER.USER_FETCH:
      return fetch(state, payloads);
    case USER.USER_LOGOUT:
      return logout(state, payloads);
    default:
      return state;
  }
};

export default reducer;
