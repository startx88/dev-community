import React, { lazy, useEffect } from "react";
import PrivateRoute from "../Web/PrivateRoute";
import { Switch } from "react-router-dom";
const Dashboard = lazy(() => import("./Dashboard"));
const Courses = lazy(() => import("./Courses"));
const Posts = lazy(() => import("./Posts"));
const Profiles = lazy(() => import("./Profiles"));
const Settings = lazy(() => import("./Settings"));

//const EditPost = lazy(() => import("./Posts/EditPost/EditPost"));

const Container = props => {
  const { getProfile, match } = props;

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <Switch>
      <PrivateRoute path={match.url} exact component={Dashboard} />
      <PrivateRoute path={match.url + "/courses"} component={Courses} />
      <PrivateRoute path={match.url + "/profiles"} component={Profiles} />
      <PrivateRoute path={match.url + "/settings"} component={Settings} />
      <PrivateRoute path={match.url + "/posts"} component={Posts} />
    </Switch>
  );
};
export default Container;
