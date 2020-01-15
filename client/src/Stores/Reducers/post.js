import { post } from "../Constants";
import updateObject from "../../_helper/updateObject";

const initState = {
  publicPosts: null,
  posts: null,
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
      item._id === payloads.id ? { ...payloads.post } : item
    )
  });

const fetchUserPosts = (state, payloads) =>
  updateObject(state, {
    loading: false,
    posts: payloads
  });

const fetchPublicPosts = (state, payloads) =>
  updateObject(state, {
    loading: false,
    publicPosts: payloads
  });

const deletePost = (state, payloads) =>
  updateObject(state, {
    posts: state.posts.filter(post => post._id !== payloads)
  });

// ADD COMMENT
const addComment = (state, payloads) =>
  updateObject(state, {
    loading: false,
    posts: state.posts.map(post =>
      post._id === payloads.id ? { ...post, comments: payloads.comment } : post
    )
  });

// like post
const likePost = (state, payloads) =>
  updateObject(state, {
    posts: state.posts.map(post =>
      post._id === payloads.postId ? { ...post, likes: payloads.likes } : post
    )
  });

const dislikePost = (state, payloads) =>
  updateObject(state, {
    posts: state.posts.map(post =>
      post._id === payloads.postId ? { ...post, likes: payloads.likes } : post
    )
  });

const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case post.POST_LOADING:
      return loading(state, payloads);
    case post.FETCH_ALL_POSTS:
      return fetchPublicPosts(state, payloads);
    case post.FETCH_USER_POSTS:
      return fetchUserPosts(state, payloads);
    case post.POST_ADD:
      return add(state, payloads);
    case post.POST_DELETE:
      return deletePost(state, payloads);
    case post.POST_UPDATE:
      return updated(state, payloads);
    case post.POST_COMMENT_ADD:
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
