import React, { lazy, useEffect } from "react";
import PrivateRoute from "../Web/PrivateRoute";
import { Switch } from "react-router-dom";
import Chat from "../Widgets/Chat";
const Dashboard = lazy(() => import("./Dashboard"));
const Courses = lazy(() => import("./Courses"));
const Profiles = lazy(() => import("./Profiles"));
const Settings = lazy(() => import("./Settings"));

const Posts = lazy(() => import("./Posts"));
const EditPost = lazy(() => import("./Posts/EditPost/EditPost"));
const SinglePost = lazy(() => import("./Posts/SinglePost"));
const PageNotFound = lazy(() => import("../Pages/PageNotFound"));

const Container = props => {
  const { getProfile, match } = props;

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Chat />
      <Switch>
        <PrivateRoute path={match.url} exact component={Dashboard} />
        <PrivateRoute path={match.url + "/courses"} component={Courses} />
        <PrivateRoute path={match.url + "/profiles"} component={Profiles} />
        <PrivateRoute path={match.url + "/settings"} component={Settings} />
        <PrivateRoute
          path={match.url + "/posts/add-post/:id?"}
          component={EditPost}
        />
        <PrivateRoute path={match.url + "/posts/:id"} component={SinglePost} />
        <PrivateRoute path={match.url + "/posts"} component={Posts} />
        <PrivateRoute component={PageNotFound} />
      </Switch>
    </>
  );
};
export default Container;
