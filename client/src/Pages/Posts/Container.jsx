import React, { useEffect, useCallback } from "react";
import Title from "../../Widgets/Title/Title";
import Spinner from "../../UI/Spinner/Spinner";
import Section from "../../UI/Layout/Section";
import PostList from "../../Widgets/PostList";
import AlertMessage from "../../UI/Alert";

const Container = props => {
  const { getAllPosts, posts, alert } = props;
  const loadPosts = useCallback(() => {
    getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (!posts) {
    return <Spinner />;
  }

  return (
    <>
      <AlertMessage type={alert.type} show={alert.show}>
        {alert.message}
      </AlertMessage>
      <Section>
        {user => {
          return (
            <>
              <Section.LeftCol {...user}>
                <Title type="page" />
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
