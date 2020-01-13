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

// update
const add = (state, payloads) =>
  updateObject(state, {
    loading: false,
    posts: [...state.posts, payloads]
  });

const update = (state, payloads) =>
  updateObject(state, {
    loading: false,
    posts: state.posts.map(item=>item._id===payloads.id?{...payloads.data}:item}
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

const addComment = (state, payloads) =>
  updateObject(state, {loading:false});

  const likePost = (state, payloads) =>
  updateObject(state, {loading:false});

  const dislikePost = (state, payloads) =>
  updateObject(state,{loading:false});

const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case post.POST_LOADING:
        return loading(state, payloads); 
    case post.FETCH_ALL_POSTS:
        return fetchPublicPosts(state, payloads);
    case post.FETCH_USER_POSTS:
      return fetchUserPosts(state, payloads);        
    case post.ADD_POST:
      return add(state, payloads);
    case post.UPDATE_POST:
      return update(state, payloads);
    case post.ADD_COMMENT:
      return addComment(state, payloads);
    case post.LIKE_POST:
      return likePost(state, payloads);
    case post.DISLIKE_POST:
      return dislikePost(state, payloads);
    default:
      return state;
  }
};

export default reducer;
