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

// Education
const addEducation = (state, payloads) =>
  updateObject(state, {
    ...state,
    profile: {
      ...state.profile,
      education: [...state.profile.education, payloads]
    }
  });
const deletEducation = (state, payloads) =>
  updateObject(state, {
    ...state,
    profile: {
      ...state.profile,
      education: state.profile.education.filter(obj => obj._id !== payloads)
    }
  });

// Experience
const addExperience = (state, payloads) =>
  updateObject(state, {
    ...state,
    profile: {
      ...state.profile,
      experience: [...state.profile.experience, payloads]
    }
  });

const deleteExperience = (state, payloads) =>
  updateObject(state, {
    ...state,
    profile: {
      ...state.profile,
      experience: state.profile.experience.filter(obj => obj._id !== payloads)
    }
  });

const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case profile.PROFILE_LOADING:
      return loading(state, payloads);
    case profile.PROFILE_FAILED:
      return failed(state, payloads);
    case profile.PROFILE_FETCH:
      return fetch(state, payloads);
    case profile.PROFILE_EXP_ADD:
      return addExperience(state, payloads);
    case profile.PROFILE_EXP_DELETE:
      return deleteExperience(state, payloads);
    case profile.PROFILE_EDU_ADD:
      return addEducation(state, payloads);
    case profile.PROFILE_EDU_DELETE:
      return deletEducation(state, payloads);
    default:
      return state;
  }
};

export default reducer;
