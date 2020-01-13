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

const addEducationSuccess = data => ({
  type: profile.PROFILE_EDU_ADD,
  payloads: data
});

const deleteEducationSuccess = id => ({
  type: profile.PROFILE_EDU_DELETE,
  payloads: id
});

const addExperienceSuccess = data => ({
  type: profile.PROFILE_EXP_ADD,
  payloads: data
});

const deleteExperienceSuccess = id => ({
  type: profile.PROFILE_EXP_DELETE,
  payloads: id
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
  try {
    const response = await axios.put("/profile/education", inputData);
    const responseData = await response.data;
    dispatch(
      addEducationSuccess({
        school: inputData.school,
        degree: inputData.degree,
        fieldofstudy: inputData.fieldofstudy,
        from: inputData.from,
        to: inputData.to,
        current: inputData.current,
        description: inputData.description
      })
    );
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    console.log(err);
    const error = err.response.data.errors;
    dispatch(showAlert(error.message, "warning"));
  }
};
export const deleteEducation = id => async dispatch => {
  try {
    const response = await axios.delete(`/profile/education/${id}`);
    const responseData = await response.data;
    dispatch(deleteEducationSuccess(responseData.educationId));
    dispatch(showAlert(responseData.message, "success"));
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
    dispatch(
      addExperienceSuccess({
        title: inputData.title,
        company: inputData.company,
        location: inputData.location,
        from: inputData.from,
        to: inputData.to,
        current: inputData.current,
        description: inputData.description
      })
    );
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    console.log(err);
    const error = err.response.data.errors;
    dispatch(showAlert(error.message, "warning"));
  }
};
export const deleteExperience = id => async dispatch => {
  try {
    const response = await axios.delete(`/profile/experience/${id}`);
    const responseData = await response.data;
    dispatch(deleteExperienceSuccess(responseData.expId));
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    console.log(err);
    const error = err.response.data.errors;
    dispatch(showAlert(error.message, "warning"));
  }
};
