import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import logger from "redux-logger";
import Reducers from "./Reducer";

// middleware
const middleware = [thunk];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const Store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
