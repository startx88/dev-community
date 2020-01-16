import { createSelector } from "reselect";
const alertState = state => state.alert;

////////////////////////////////////
///////// Posts
///////////////////////////////////
const postState = state => state.posts;

// get single post
export const selectPost =
  ([postState], state => state.posts !== null && state.posts.post);

// get all posts
export const selectAllPost = createSelector(
  [postState],
  state => state !== null && state.publicPosts
);

// get user posts
export const userPosts = createSelector(
  [postState, alertState],
  (state, alert) => ({
    posts: state.posts !== null && state.posts,
    alert: alert
  })
);

////////////////////////////////////
///////// Current user
///////////////////////////////////
const userState = state => state.auth;

export const userSelector = createSelector([userState], state => state);
