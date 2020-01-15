import React, { useEffect, useCallback } from "react";
import Title from "../../Widgets/Title/Title";
import Spinner from "../../UI/Spinner/Spinner";
import Post from "../../Widgets/Post/Post";
const Container = props => {
  const { getAllPost, posts } = props;

  const loadPosts = useCallback(() => {
    getAllPost();
  }, [getAllPost]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (!posts) {
    return <Spinner />;
  }

  return (
    <>
      <Title />
      <div className="row">
        <div className="col-sm-9">
          <div className="row">
            {posts.map(post => (
              <Post link key={post._id} postinfo={post} likes={post.likes} />
            ))}
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </>
  );
};
export default Container;
