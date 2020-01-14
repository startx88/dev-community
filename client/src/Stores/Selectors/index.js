import { createSelector } from "reselect";
////////////////////////////////////
///////// Posts
///////////////////////////////////
const postState = state => state.posts;
const alertState = state => state.alert;

const selectPostItems = createSelector(
  [postState],
  state => state.posts !== null && state.posts
);
// user posts
export const userPosts = createSelector(
  [postState, alertState],
  (state, alert) => ({
    posts: state.posts !== null && state.posts,
    alert: alert
  })
);
