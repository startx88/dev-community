import { post } from "../Constants";
import updateObject from "../../_helper/updateObject";

const initState = {
  posts: null,
  post: null,
  error: null,
  loading: false
};

// LOADING
const loading = (state, payloads) => updateObject(state, { loading: true });

// FAILED
const failed = (state, payloads) =>
  updateObject(state, { loading: false, errors: payloads });

// ADD POST
const add = (state, payloads) =>
  updateObject(state, {
    loading: false,
    posts: [...state.posts, payloads]
  });

// UPDATE POST
const updated = (state, payloads) =>
  updateObject(state, {
    loading: false,
    posts: state.posts.map(item =>
      item._id === payloads.id ? { ...item, ...payloads.post } : item
    )
  });

const deletePost = (state, payloads) =>
  updateObject(state, {
    posts: state.posts.filter(post => post._id !== payloads)
  });

// like post
const likePost = (state, payloads) =>
  updateObject(state, {
    posts: state.posts.map(post =>
      post._id === payloads.postId ? { ...post, likes: payloads.likes } : post
    ),
    post: {
      ...state.post,
      likes: payloads.likes
    }
  });

const dislikePost = (state, payloads) =>
  updateObject(state, {
    posts: state.posts.map(post =>
      post._id === payloads.postId ? { ...post, likes: payloads.likes } : post
    ),
    post: {
      ...state.post,
      likes: payloads.likes
    }
  });

// ADD COMMENT
const addComment = (state, payloads) => {
  return updateObject(state, {
    posts: state.posts.map(post =>
      post._id === payloads.id ? { ...post, comments: payloads.comments } : post
    ),
    post: {
      ...state.post,
      comments: payloads.comments
    }
  });
};

// All Posts
const posts = (state, payloads) =>
  updateObject(state, {
    loading: false,
    posts: payloads
  });

// Fetch Post
const fetchPost = (state, payloads) =>
  updateObject(state, { loading: false, post: payloads });

// RETUDER
const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case post.POST_LOADING:
      return loading(state, payloads);
    case post.POST_FAILED:
      return failed(state, payloads);
    case post.FETCH_SINGLE_POST:
      return fetchPost(state, payloads);
    case post.FETCH_ALL_POSTS:
    case post.FETCH_USER_POSTS:
    case post.FETCH_POST_BY_USER_ID:
      return posts(state, payloads);
    case post.POST_ADD:
      return add(state, payloads);
    case post.POST_DELETE:
      return deletePost(state, payloads);
    case post.POST_UPDATE:
      return updated(state, payloads);
    case post.ADD_COMMENT:
    case post.DELETE_COMMENT:
      return addComment(state, payloads);
    case post.POST_LIKE:
      return likePost(state, payloads);
    case post.POST_DISLIKE:
      return dislikePost(state, payloads);
    default:
      return state;
  }
};

export default reducer;
