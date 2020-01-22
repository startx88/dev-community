import React, { lazy } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import UserLayout from "../UI/Layout/User";
import PublicLayout from "../UI/Layout/Public";

const Login = lazy(() => import("../Auth/Login"));
const Register = lazy(() => import("../Auth/Register"));
const Logout = lazy(() => import("../Auth/Logout"));
const FortgotPassword = lazy(() => import("../Auth/ForgotPassword"));
const Home = lazy(() => import("../Pages/Home"));
const NotFound = lazy(() => import("../Pages/PageNotFound"));
const Developers = lazy(() => import("../Pages/Developers"));
const DeveloperProfile = lazy(() =>
  import("../Pages/Developers/ViewProfile/ViewProfile")
);
const Course = lazy(() => import("../Pages/Courses"));
const User = lazy(() => import("../Users"));

const Web = props => {
  return (
    <Switch>
      <PublicRoute exact path="/" layout={PublicLayout} component={Home} />
      <PublicRoute path="/login" layout={PublicLayout} component={Login} />
      <PrivateRoute path="/logout" component={Logout} />
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

      <PrivateRoute
        path="/developers/:id"
        layout={UserLayout}
        component={DeveloperProfile}
      />
      <PrivateRoute
        path="/developers"
        layout={UserLayout}
        component={Developers}
      />
      <PrivateRoute path="/projects" layout={UserLayout} component={Course} />
      <PrivateRoute path="/users" layout={UserLayout} component={User} />
      <PublicRoute layout={PublicLayout} component={NotFound} />
    </Switch>
  );
};

export default Web;
