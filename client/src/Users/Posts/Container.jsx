import React, { lazy, useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import PrivateRoute from "../../Web/PrivateRoute";
import AlertMessage from "../../UI/Alert";
import Spinner from "../../UI/Spinner/Spinner";
import Post from "./Post";
import { Link, Switch } from "react-router-dom";

// Container
const Container = props => {
  const { match, getUserPosts, posts, alert } = props;

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
      <AlertMessage type={alert.type} show={alert.show} />
      <div className="row">
        {posts.posts && posts.posts.length === 0 ? (
          <div className="no-post" />
        ) : (
          posts.posts &&
          posts.posts.map(post => (
            <Post key={post._id} postinfo={post} classname="col-sm-6 d-flex" />
          ))
        )}
      </div>
    </>
  );
};
export default Container;
