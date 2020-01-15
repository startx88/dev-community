import React, { useEffect, useCallback } from "react";
import Title from "../../Widgets/Title/Title";
import Spinner from "../../UI/Spinner/Spinner";
import Post from "../../Widgets/Post/Post";
import Section from "../../UI/Layout/Section";
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
                <div className="row">
                  {posts.map(post => (
                    <Post
                      link
                      key={post._id}
                      postinfo={post}
                      likes={post.likes}
                      classname="col-sm-12"
                    />
                  ))}
                </div>
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
