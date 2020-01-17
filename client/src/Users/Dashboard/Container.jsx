import React, { useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import PostList from "../../Widgets/PostList";

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

  return (
    <>
      <Title type="admin" />
      <hr />
      <PostList postdata={posts} {...props} />
    </>
  );
};
export default Container;
