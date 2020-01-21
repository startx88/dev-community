import React, { useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import Section from "../../UI/Layout/Section";
import UserPost from "../widgets/userPost";
import UserStatus from "../widgets/UserStatus/UserStatus";
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
