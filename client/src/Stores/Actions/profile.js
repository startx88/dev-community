import { profile } from "../Constants";
import axios from "../../axios_instance";
import { showAlert } from "./alert";

const loading = () => ({ type: profile.PROFILE_LOADING });

const failed = error => ({ type: profile.PROFILE_FAILED, payloads: error });

const fetchProfile = data => ({
  type: profile.PROFILE_FETCH,
  payloads: data
});

///////////////////////////////
/////// CHECK AUTHENTICATION
///////////////////////////////////
export const getProfile = () => async dispatch => {
  try {
    const user = await axios.get("/profile/me");
    const userData = await user.data;
    dispatch(fetchProfile(userData.profile));
  } catch (err) {
    console.log(err);
  }
};
