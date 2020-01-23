import React, { lazy, useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import PrivateRoute from "../../Web/PrivateRoute";
import AlertMessage from "../../UI/Alert";
import Spinner from "../../UI/Spinner/Spinner";
import PostList from "../widgets/PostList";
import { Link, Switch } from "react-router-dom";

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
      <Title type="page" tagline="Welcome to the depelopers page.">
        <Link to={match.url + "/add-post"} className="btn btn-info btn-sm">
          Add Post
        </Link>
      </Title>
      <hr />
      <AlertMessage type={alert.type} show={alert.show} />
      <PostList postdata={userposts} />
    </>
  );
};
export default Container;
