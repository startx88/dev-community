import { alert } from "../Constants";
import updateObject from "../../_helper/updateObject";

// initial state
const initState = {
  show: false,
  message: null,
  type: "warning"
};

// hide alert
const hideAlert = (state, payloads) =>
  updateObject(state, { show: false, message: null, type: "warning" });

//show alert
const showAlert = (state, payloads) =>
  updateObject(state, {
    show: true,
    message: payloads.message,
    type: payloads.type
  });

// reducer
const reducer = (state = initState, action) => {
  const { type, payloads } = action;
  switch (type) {
    case alert.ALERT_HIDE:
      return hideAlert(state, payloads);
    case alert.ALERT_SHOW:
      return showAlert(state, payloads);
    default:
      return state;
  }
};

export default reducer;
