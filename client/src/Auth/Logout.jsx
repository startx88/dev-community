import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Stores/Actions";

// Logout
const Logout = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return <Redirect to="/login" />;
};

export default Logout;
