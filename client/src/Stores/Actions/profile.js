import { profile } from "../Constants";
import axios from "../../axios_instance";
import { showAlert } from "./alert";

const loading = () => ({ type: profile.PROFILE_LOADING });

const failed = error => ({ type: profile.PROFILE_FAILED, payloads: error });

const fetchProfile = data => ({
  type: profile.PROFILE_FETCH,
  payloads: data
});

const ADD_PROFILE = data => ({
  type: profile.PROFILE_ADD,
  payloads: data
});

const UPDATE_PROFILE = (id, data) => ({
  type: profile.PROFILE_UPDATE,
  payloads: { id, data }
});

const DELETE_PROFILE = error => ({
  type: profile.PROFILE_DELETE,
  payloads: error
});

///////////////////////////////
/////// Get current profile
///////////////////////////////////
export const getProfile = () => async dispatch => {
  try {
    const user = await axios.get("/profile/me");
    const userData = await user.data;
    dispatch(fetchProfile(userData.profile));
  } catch (err) {
    const error = err.response.data.errors;
    dispatch(showAlert(error.message, "warning"));
  }
};

///////////////////////////////
/////// add / update profile
///////////////////////////////////
export const addProfile = (inputData, id, status) => async dispatch => {
  const postData = {
    ...inputData,
    status: inputData.status.title
  };
  try {
    if (status === "UPDATE") {
      const response = await axios.post(`/profile/${id}`, postData);
      const responseData = await response.data;
      dispatch(
        UPDATE_PROFILE(id, {
          company: inputData.company,
          website: inputData.website,
          location: inputData.location,
          status: inputData.status,
          skills: inputData.skills,
          bio: inputData.bio,
          gitusername: inputData.gitusername,
          youtube: inputData.youtube,
          twitter: inputData.twitter,
          facebook: inputData.facebook,
          linkedin: inputData.linkedin,
          instagram: inputData.instagram
        })
      );
    } else {
      const response = await axios.post("/profile", postData);
      const responseData = await response.data;
      console.log(responseData);
      dispatch(
        ADD_PROFILE({
          company: inputData.company,
          website: inputData.website,
          location: inputData.location,
          status: inputData.status,
          skills: inputData.skills,
          bio: inputData.bio,
          gitusername: inputData.gitusername,
          youtube: inputData.youtube,
          twitter: inputData.twitter,
          facebook: inputData.facebook,
          linkedin: inputData.linkedin,
          instagram: inputData.instagram
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////
/////// add / Delete education
///////////////////////////////////
export const addEducation = inputData => async dispatch => {
  console.log("e", inputData);
  try {
    const response = await axios.put("/profile/education", inputData);
    const responseData = await response.data;
    showAlert(responseData.message, "success");
  } catch (err) {
    console.log(err);
  }
};
export const deleteEducation = id => async dispatch => {
  try {
    const response = await axios.delete(`/profile/education/${id}`);
    const responseData = await response.data;
    showAlert(responseData.message, "success");
  } catch (err) {
    console.log(err);
  }
};
///////////////////////////////
/////// add / update profile
///////////////////////////////////
export const addExperience = inputData => async dispatch => {
  try {
    const response = await axios.put("/profile/experience", inputData);
    const responseData = await response.data;
    showAlert(responseData.message, "success");
  } catch (err) {
    console.log(err);
  }
};
export const deleteExperience = id => async dispatch => {
  try {
    const response = await axios.delete(`/profile/experience/${id}`);
    const responseData = await response.data;
    showAlert(responseData.message, "success");
  } catch (err) {
    console.log(err);
  }
};
