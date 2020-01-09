import { combineReducers } from "redux";
import auth from "./Reducers/auth";
import alert from "./Reducers/alert";
const reducer = combineReducers({
  auth,
  alert
});

export default reducer;
