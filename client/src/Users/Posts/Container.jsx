import React, { lazy, useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";

import { Link } from "react-router-dom";
import PrivateRoute from "../../Web/PrivateRoute";

const EditPost = lazy(() => import("./EditPost"));
const PostList = lazy(() => import("./PostList"));

const Container = props => {
  const { match, fetchUserPosts, userPost } = props;

  const loadUserPost = useCallback(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  useEffect(() => {
    loadUserPost();
  }, [loadUserPost]);

  return (
    <>
      <Title type="admin">
        <Link to={match.url + "/add-post"} className="btn btn-info btn-sm">
          Add Post
        </Link>
      </Title>
      <hr />

      <PrivateRoute
        exact
        path={match.url}
        component={childProps => (
          <PostList parentProp={props} {...childProps} />
        )}
      />
      <PrivateRoute
        path={match.url + "/add-post"}
        component={childProps => (
          <EditPost parentProp={props} {...childProps} />
        )}
      />
    </>
  );
};
export default Container;
