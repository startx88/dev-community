import { createSelector } from "reselect";
////////////////////////////////////
///////// Posts
///////////////////////////////////
const postState = state => state.posts;
const alertState = state => state.alert;

export const selectAllPost = createSelector(
  [postState],
  state => state !== null && state.publicPosts
);

// user posts
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
