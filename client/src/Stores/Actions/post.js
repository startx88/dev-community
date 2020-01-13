import { post } from "../Constants";
import axios from "../../axios_instance";
import { showAlert } from "./alert";
// success
const success = data => ({ type: post.ADD_POST, payloads: data });

// success
const update = (id, data) => ({
  type: post.UPDATE_POST,
  payloads: { id, data }
});

// likes
const likes = data => ({ type: post.LIKE_POST, payloads: data });
// dislikes
const dislikes = data => ({ type: post.DISLIKE_POST, payloads: data });
// comment
const comment = data => ({ type: post.ADD_COMMENT, payloads: data });
// add post
export const addPost = (inputdata, id, status) => async dispatch => {
  try {
    if (status === "UPDATE") {
      const response = await axios.post(`/post/${id}`, inputdata);
      const responseData = await response.data;
      console.log("update", responseData);
      dispatch(success(responseData.post));
      dispatch(showAlert(responseData.message, "success"));
    } else {
      const response = await axios.post("/post", inputdata);
      const responseData = await response.data;
      console.log("add", responseData);
      dispatch(success(responseData.post));
      dispatch(showAlert(responseData.message, "success"));
    }
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};

export const addComment = inputdata => async dispatch => {
  try {
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};

export const likePost = inputdata => async dispatch => {
  try {
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};

export const dislikePost = inputdata => async dispatch => {
  try {
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};
