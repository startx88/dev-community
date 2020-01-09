import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../Stores/Actions";
import Button from "./Button";
import Icons from "./Icons";

/** Alert Message Component */
const AlertMessage = ({ show, type, classname, children, ...rest }) => {
  const dispatch = useDispatch();
  const { message, alerttype } = useSelector(state => state.alert);

  // Auto hide the alert
  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     dispatch(alertHide());
  //   }, 5000);
  //   return () => {
  //     clearTimeout(interval);
  //   };
  // }, [show, dispatch]);

  // Alert Hide Handler
  const alertHideHandler = useCallback(() => {
    dispatch(hideAlert());
  }, [dispatch]);

  return show ? (
    <div
      className={[
        "alert",
        `alert-${type ? type : type}`,
        "alert-dismissible",
        classname
      ].join(" ")}
    >
      <Button classname="close">
        <Icons icon="times" />
      </Button>
      <button
        type="button"
        className="close"
        onClick={alertHideHandler}
      ></button>
      {children ? children : message}
    </div>
  ) : (
    ""
  );
};

export default AlertMessage;
