import React, { lazy, useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import PrivateRoute from "../../Web/PrivateRoute";
import AlertMessage from "../../UI/Alert";
import Spinner from "../../UI/Spinner/Spinner";
import PostList from "../widgets/PostList";
import { Link, Switch } from "react-router-dom";

// Container
const Container = props => {
  const { match, getUserPosts, posts, addPost, alert } = props;

  const loadUserPost = useCallback(() => {
    getUserPosts();
  }, [getUserPosts]);

  useEffect(() => {
    loadUserPost();
  }, [loadUserPost]);

  if (posts.loading) {
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
      {posts.posts && posts.posts.length === 0 ? (
        <div className="no-post" />
      ) : (
        <PostList postdata={posts.posts} />
      )}
    </>
  );
};
export default Container;
