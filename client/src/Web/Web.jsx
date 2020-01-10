import React, { lazy } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import UserLayout from "../UI/Layout";
import PublicLayout from "../UI/Layout/Public";

const Login = lazy(() => import("../Auth/Login"));
const Register = lazy(() => import("../Auth/Register"));
const Logout = lazy(() => import("../Auth/Logout"));
const FortgotPassword = lazy(() => import("../Auth/ForgotPassword"));
const Home = lazy(() => import("../Pages/Home"));
const Developers = lazy(() => import("../Pages/Developers"));
const Course = lazy(() => import("../Pages/Courses"));
const Posts = lazy(() => import("../Pages/Posts"));
const User = lazy(() => import("../Users"));

const Web = props => {
  return (
    <Switch>
      <PublicRoute exact path="/" layout={PublicLayout} component={Home} />
      <PublicRoute path="/login" layout={PublicLayout} component={Login} />
      <PublicRoute
        path="/register"
        layout={PublicLayout}
        component={Register}
      />
      <PublicRoute
        path="/forgot-password"
        layout={PublicLayout}
        component={FortgotPassword}
      />
      <PublicRoute path="/developers" component={Developers} />
      <PublicRoute path="/courses" component={Course} />
      <PublicRoute path="/posts" component={Posts} />
      <PublicRoute path="/logout" component={Logout} />
      <PrivateRoute path="/users" layout={UserLayout} component={User} />
    </Switch>
  );
};

export default Web;
