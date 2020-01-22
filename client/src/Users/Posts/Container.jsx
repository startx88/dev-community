import React, { lazy, useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import PrivateRoute from "../../Web/PrivateRoute";
import AlertMessage from "../../UI/Alert";
import Spinner from "../../UI/Spinner/Spinner";
import { Link, Switch } from "react-router-dom";

const PostList = lazy(() => import("../widgets/PostList"));
const EditPost = lazy(() => import("./EditPost/EditPost"));
const SinglePost = lazy(() => import("./SinglePost"));

// Container
const Container = props => {
  const { match, getUserPosts, userposts, addPost, alert } = props;

  const loadUserPost = useCallback(() => {
    getUserPosts();
  }, [getUserPosts]);

  useEffect(() => {
    loadUserPost();
  }, [loadUserPost]);

  if (!userposts) {
    return <Spinner />;
  }

  return (
    <>
      <Title type="admin">
        <Link to={match.url + "/add-post"} className="btn btn-info btn-sm">
          Add Post
        </Link>
      </Title>
      <hr />
      <AlertMessage type={alert.type} show={alert.show}>
        {alert.message}
      </AlertMessage>
      <Switch>
        <PrivateRoute
          path={match.url + "/add-post/:id?"}
          component={childprops => (
            <EditPost parentProps={props} {...childprops} />
          )}
        />
        <PrivateRoute path={match.url + "/:id"} component={SinglePost} />
        <PrivateRoute
          exact
          path={match.url}
          component={childprops => (
            <PostList postdata={userposts} {...childprops} />
          )}
        />
      </Switch>
    </>
  );
};
export default Container;
