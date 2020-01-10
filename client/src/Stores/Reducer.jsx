import { combineReducers } from "redux";
import auth from "./Reducers/auth";
import alert from "./Reducers/alert";
import profile from "./Reducers/profile";

const reducer = combineReducers({
  auth,
  alert,
  profile
});

export default reducer;
