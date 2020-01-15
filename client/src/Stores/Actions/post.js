import { post } from "../Constants";
import axios from "../../axios_instance";
import { showAlert } from "./alert";

// LOADING
const loading = () => ({ type: post.POST_LOADING });

// FAILED
const failed = error => ({ type: post.POST_FAILED, payloads: error });

// ADD POST
const add_post = postdata => ({ type: post.POST_ADD, payloads: postdata });

// DELETE POST
const delete_post = id => ({ type: post.POST_DELETE, payloads: id });

// UPDATE POST
const update_post = (id, postdata) => ({
  type: post.POST_UPDATE,
  payloads: {
    id: id,
    post: postdata
  }
});

// LIKE POST
const like_post = (postId, likes) => ({
  type: post.POST_LIKE,
  payloads: {
    postId: postId,
    likes: likes
  }
});

// DISLIKE POST
const dislike_post = (postId, likes) => ({
  type: post.POST_DISLIKE,
  payloads: {
    postId: postId,
    likes: likes
  }
});

// comment
const add_comment = (id, comment) => ({
  type: post.POST_COMMENT_ADD,
  payloads: {
    id: id,
    comment: comment
  }
});

const delete_comment = commentId => ({
  type: post.POST_COMMENT_ADD,
  payloads: commentId
});

// FETCH USER POST
const user_posts = posts => ({
  type: post.FETCH_USER_POSTS,
  payloads: posts
});

// FETCH ALL POST FOR PUBLIC USE
const all_posts = posts => ({
  type: post.FETCH_ALL_POSTS,
  payloads: posts
});

// FETCH USER POSTS
export const fetchUserPosts = () => async dispatch => {
  dispatch(loading());
  try {
    const response = await axios.get("/posts/user");
    const responseData = await response.data;
    dispatch(user_posts(responseData.data));
  } catch (err) {
    console.log("error on add and update post", err);
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    dispatch(failed(message));
  }
};

// FETCH USER POSTS
export const getAllPosts = () => async dispatch => {
  dispatch(loading());
  try {
    const response = await axios.get("/posts");
    const responseData = await response.data;
    dispatch(all_posts(responseData.data));
  } catch (err) {
    console.log("error on add and update post", err);
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    dispatch(failed(message));
  }
};

// add post
export const addPost = (inputdata, id, status) => async dispatch => {
  dispatch(loading());
  // Form Data
  const formdata = new FormData();
  formdata.append("title", inputdata.title);
  formdata.append("description", inputdata.description);
  formdata.append("avatar", inputdata.avatar);

  try {
    if (status === "UPDATE") {
      const response = await axios.put(`/posts/${id}`, formdata);
      const responseData = await response.data;
      console.log("update", responseData);
      dispatch(update_post(responseData.postId, responseData.post));
      dispatch(showAlert(responseData.message, "success"));
    } else {
      const response = await axios.post("/posts", formdata);
      const responseData = await response.data;
      console.log("hello", responseData);
      dispatch(add_post(responseData.post));
      dispatch(showAlert(responseData.message, "success"));
    }
  } catch (err) {
    console.log("error on add and update post", err);
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    dispatch(failed(message));
  }
};

// DELETE POST
export const deletePost = postId => async dispatch => {
  const confirm = window.confirm("Are you sure!");
  if (!confirm) {
    return false;
  }
  try {
    const response = await axios.delete(`/posts/${postId}`);
    const responseData = await response.data;
    dispatch(delete_post(responseData.postId));
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    console.log("error on add and update post", err);
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    dispatch(failed(message));
  }
};

// Comment
export const addComment = (postId, inputdata) => async dispatch => {
  console.log(postId, inputdata);
  try {
    const response = await axios.post(`/posts/comment/${postId}`, inputdata);
    const responseData = await response.data;
    console.log("res", responseData);
    dispatch(add_comment(postId, responseData.comments));
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};

// Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const response = await axios.post(`/posts/comment/${postId}${commentId}`);
    const responseData = await response.data;

    dispatch(add_comment(commentId));
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};

// LIKED POST
export const likePost = postId => async dispatch => {
  try {
    const response = await axios.put(`/posts/like/${postId}`);
    const responseData = await response.data;
    dispatch(like_post(postId, responseData.likes));
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};

// DISLIKE POST
export const dislikePost = postId => async dispatch => {
  try {
    const response = await axios.put(`/posts/dislike/${postId}`);
    const responseData = await response.data;
    dispatch(dislike_post(postId, responseData.likes));
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};
