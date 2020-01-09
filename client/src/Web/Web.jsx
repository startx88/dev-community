import React, { lazy } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import UserLayout from "../UI/Layout";

const Login = lazy(() => import("../Auth/Login"));
const Register = lazy(() => import("../Auth/Register"));
const Logout = lazy(() => import("../Auth/Logout"));
const FortgotPassword = lazy(() => import("../Auth/ForgotPassword"));
const Home = lazy(() => import("../Pages/Home"));
const User = lazy(() => import("../Users"));

const Web = props => {
  return (
    <Switch>
      <PublicRoute exact path="/" component={Home} />
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/forgot-password" component={FortgotPassword} />
      <PublicRoute path="/logout" component={Logout} />
      <PrivateRoute path="/users" layout={UserLayout} component={User} />
    </Switch>
  );
};

export default Web;
