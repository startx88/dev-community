import { createSelector } from "reselect";
const alertState = state => state.alert;
export const selectAlert = createSelector([alertState], state => state);

////////////////////////////////////
///////// Posts
///////////////////////////////////
const postState = state => state.posts;

// get single post
export const selectPost = createSelector(
  [postState],
  state => state.post !== null && state.post
);

// get all posts
export const selectAllPost = createSelector(
  [postState],
  state => state !== null && state.posts
);

// get user posts
export const userPosts = createSelector(
  [postState],
  state => state.userpost !== null && state.userpost
);

////////////////////////////////////
///////// Current user
///////////////////////////////////
const userState = state => state.auth;
export const userSelector = createSelector([userState], state => state);

////////////////////////////////////
///////// Current user profile
///////////////////////////////////
const profileState = state => state.profile;
export const selectUserProfile = createSelector([profileState], state => state);
