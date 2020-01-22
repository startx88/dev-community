import { profile } from "../Constants";
import updateObject from "../../_helper/updateObject";

/**
 * Initial State
 */
const initState = {
  profiles: [],
  profile: null,
  errors: null,
  loading: false
};

/** Loading */
const loading = (state, payloads) => updateObject(state, { loading: true });

/** Failed */
const failed = (state, payloads) =>
  updateObject(state, { loading: false, errors: payloads });

/** Get logged-in user profile */

const fetch = (state, payloads) =>
  updateObject(state, {
    loading: false,
    profile: payloads
  });

/** Add/Delete user education */
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

/**
 * Experience methods
 * @param {*} state
 * @param {*} payloads
 */
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

/**
 * Fetch all profiles
 */
const allProfiles = (state, payloads) =>
  updateObject(state, { loading: false, profiles: payloads });

/**
 * REDUCER
 * @param {*} state
 * @param {*} action
 */
const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case profile.PROFILE_LOADING:
      return loading(state, payloads);
    case profile.PROFILE_FAILED:
      return failed(state, payloads);
    case profile.PROFILE_FETCH:
    case profile.PROFILE_ADD:
      return fetch(state, payloads);
    case profile.PROFILE_ALL:
      return allProfiles(state, payloads);
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
