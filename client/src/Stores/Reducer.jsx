import { combineReducers } from "redux";
import auth from "./Reducers/auth";
import alert from "./Reducers/alert";
import profile from "./Reducers/profile";
import posts from "./Reducers/post";

const reducer = combineReducers({
  auth,
  alert,
  profile,
  posts
});

export default reducer;
