import { alert } from "../Constants";

// Hide Alert
export const hideAlert = () => {
  return {
    type: alert.ALERT_HIDE
  };
};

// Show Alert
export const showAlert = (message, type) => dispatch => {
  dispatch({
    type: alert.ALERT_SHOW,
    payloads: {
      message,
      type
    }
  });
  // hide autometically
  setTimeout(
    () =>
      dispatch({
        type: alert.ALERT_HIDE,
        payloads: null
      }),
    3000
  );
};
