import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import Reducers from "./Reducer";

// initial state
const initialState = {};

// middleware
const middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware.push(thunk);
}

const Store = createStore(
  Reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
