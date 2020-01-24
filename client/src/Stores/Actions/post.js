import { post } from "../Constants";
import axios from "axios";
import { showAlert } from "./alert";

// LOADING
const loading = () => ({ type: post.POST_LOADING });

// FAILED
const failed = error => ({ type: post.POST_FAILED, payloads: error });

// DELETE POST
const delete_post = id => ({ type: post.POST_DELETE, payloads: id });

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

// FETCH ALL POST FOR PUBLIC USE
const all_posts = posts => ({
  type: post.FETCH_ALL_POSTS,
  payloads: posts
});

const user_posts = posts => ({
  type: post.FETCH_USER_POSTS,
  payloads: posts
});

// Common function
const postWithProfile = async posts => {
  try {
    const responseProfile = await axios.get("/profile");
    const { profiles } = await responseProfile.data;
    return posts.map(post => {
      for (let index in profiles) {
        if (post.user === profiles[index].user._id) {
          return {
            ...post,
            status: profiles[index].status,
            user: profiles[index].user
          };
        }
      }
      return post;
    });
  } catch (err) {
    console.log(err);
  }
};

// FETCH USER POSTS
export const getAllPosts = () => async dispatch => {
  dispatch(loading());

  try {
    const response = await axios.get("/posts");
    const { posts } = await response.data;

    const transformpostdata = await postWithProfile(posts);
    dispatch(all_posts(transformpostdata));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    dispatch(failed(message));
  }
};

// FETCH USER POSTS
export const getUserPosts = () => async dispatch => {
  dispatch(loading());
  try {
    const response = await axios.get("/posts/user");
    const { posts, message } = await response.data;
    const transformpostdata = await postWithProfile(posts);
    dispatch(user_posts(transformpostdata));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
    dispatch(failed(message));
  }
};

/**
 * FETCH POST BY USER ID
 * @param {*} userId
 */
export const getPostByUserId = userId => async dispatch => {
  dispatch(loading());
  try {
    const responose = await axios.get("/posts/user/" + userId);
    const { posts } = await responose.data;
    const transformpostdata = await postWithProfile(posts);
    dispatch({
      type: post.FETCH_POST_BY_USER_ID,
      payloads: transformpostdata
    });
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(failed(message));
    dispatch(showAlert(message, "warning"));
  }
};

/*******
 * Get single post
 **********************/
const get_single_post = postdata => ({
  type: post.FETCH_SINGLE_POST,
  payloads: postdata
});

export const getPost = postId => async dispatch => {
  try {
    const responose = await axios.get("/posts/" + postId);
    const { post } = await responose.data;
    const responseProfile = await axios.get("/profile");
    const { profiles } = await responseProfile.data;
    const newpost = profiles.find(profile => profile.user._id === post.user);
    dispatch(get_single_post({ ...post, status: newpost.status }));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};

/*********
 * Add / Update post
 **************************/
const add_post = postdata => ({ type: post.POST_ADD, payloads: postdata });
const update_post = (id, postdata) => ({
  type: post.POST_UPDATE,
  payloads: {
    id: id,
    post: postdata
  }
});

export const addPost = (inputdata, id, status) => async dispatch => {
  dispatch(loading());
  try {
    if (status === "UPDATE") {
      const response = await axios.put(`/posts/${id}`, inputdata);
      const { post, postId, message } = await response.data;
      dispatch(update_post(postId, post));
      dispatch(showAlert(message, "success"));
    } else {
      const response = await axios.post("/posts", inputdata);
      const { post, message } = await response.data;
      dispatch(add_post(post));
      dispatch(showAlert(message, "success"));
    }
  } catch (err) {
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

// LIKED POST
export const likePost = postId => async dispatch => {
  try {
    const response = await axios.put(`/posts/like/${postId}`);
    const responseData = await response.data;
    dispatch(like_post(postId, responseData.likes));
    dispatch(showAlert(responseData.message, "success"));
  } catch (err) {
    console.log(err);
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

////////////////////
///// Comments add / delete
////////////////////////////////////////////////
const add_comment = (postId, comments) => ({
  type: post.ADD_COMMENT,
  payloads: {
    id: postId,
    comments: comments
  }
});

export const addComment = (postId, inputdata) => async dispatch => {
  try {
    const response = await axios.post(`/posts/comment/${postId}`, inputdata);
    const { data } = await response;
    dispatch(add_comment(postId, data.comments));
    dispatch(showAlert(data.message, "success"));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};

// Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const response = await axios.delete(
      `/posts/comment/${postId}/${commentId}`
    );
    const { data } = await response;
    dispatch(add_comment(postId, data.comments));
    dispatch(showAlert(data.message, "success"));
  } catch (err) {
    const { message } = err.response.data.errors;
    dispatch(showAlert(message, "warning"));
  }
};
