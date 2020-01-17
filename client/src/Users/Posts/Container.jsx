import React, { lazy, useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import PrivateRoute from "../../Web/PrivateRoute";
import AlertMessage from "../../UI/Alert";
import { Link } from "react-router-dom";

const EditPost = lazy(() => import("./EditPost"));
const PostList = lazy(() => import("../../Widgets/PostList"));

const Container = props => {
  const {
    match,
    getAllPosts,
    allposts: { posts, alert }
  } = props;

  const loadUserPost = useCallback(() => {
    getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    loadUserPost();
  }, [loadUserPost]);

  console.log("user", props);
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
      <PrivateRoute
        exact
        path={match.url}
        component={childProps => <PostList postdata={posts} {...childProps} />}
      />
      <PrivateRoute
        path={match.url + `/add-post/:id?`}
        component={childProps => (
          <EditPost parentProp={props} {...childProps} />
        )}
      />
    </>
  );
};
export default Container;
