import { profile } from "../Constants";
import updateObject from "../../_helper/updateObject";

const initState = {
  profiles: [],
  profile: null,
  errors: null,
  loading: false
};

const loading = (state, payloads) => updateObject(state, { loading: true });

const failed = (state, payloads) =>
  updateObject(state, { loading: false, errors: payloads });

const fetch = (state, payloads) =>
  updateObject(state, {
    loading: false,
    profile: payloads
  });

const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case profile.PROFILE_LOADING:
      return loading(state, payloads);
    case profile.PROFILE_FAILED:
      return failed(state, payloads);
    case profile.PROFILE_FETCH:
      console.log("pp", payloads);
      return fetch(state, payloads);
    default:
      return state;
  }
};

export default reducer;
