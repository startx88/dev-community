import React, { useEffect, useCallback } from "react";
import Title from "../../Widgets/Title/Title";
import Spinner from "../../UI/Spinner/Spinner";
import Post from "../../Widgets/Post/Post";
import Section from "../../UI/Layout/Section";
import PostList from "../../Widgets/PostList";
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
      <Section>
        {user => {
          return (
            <>
              <Section.LeftCol {...user}>
                <Title />
                <PostList postdata={posts} />
              </Section.LeftCol>
              <Section.RightCol {...user}>hello</Section.RightCol>
            </>
          );
        }}
      </Section>
    </>
  );
};
export default Container;
