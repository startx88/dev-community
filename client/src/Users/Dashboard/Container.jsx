import React, { useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import UserPost from "../../Widgets/PostList/controls/userPost";
import Section from "../../UI/Layout/Section";
import UserStatus from "../../Widgets/UserStatus/UserStatus";
import Panel from "../../UI/Panel";
const Container = props => {
  const { match, getAllPosts, allposts } = props;

  const loadUserPost = useCallback(() => {
    getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    loadUserPost();
  }, [loadUserPost]);

  return (
    <>
      <Section>
        {user => {
          return (
            <>
              <Section.LeftCol>
                <UserStatus />
                <Panel>
                  <UserPost />
                </Panel>
              </Section.LeftCol>
              <Section.RightCol>
                <UserPost />
              </Section.RightCol>
            </>
          );
        }}
      </Section>
    </>
  );
};
export default Container;
