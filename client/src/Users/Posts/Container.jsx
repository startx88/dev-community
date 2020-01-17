import React, { lazy, useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import PrivateRoute from "../../Web/PrivateRoute";
import AlertMessage from "../../UI/Alert";
import PostList from "../../Widgets/PostList";
import { Link } from "react-router-dom";

// Container
const Container = props => {
  const { match, getUserPosts, userposts } = props;

  const loadUserPost = useCallback(() => {
    getUserPosts();
  }, [getUserPosts]);

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
      <AlertMessage type={alert.type} show={alert.show}>
        {alert.message}
      </AlertMessage>

      <PostList postdata={userposts} />
    </>
  );
};
export default Container;
