import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import Reducers from "./Reducer";

// middleware
const middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware.push(thunk);
}

const Store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
