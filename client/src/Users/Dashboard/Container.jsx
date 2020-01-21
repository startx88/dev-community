import React, { useCallback, useEffect } from "react";
import Title from "../../Widgets/Title/Title";
import Section from "../../UI/Layout/Section";
import Posts from "../../Widgets/Posts/Posts";
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
    <div className="row">
      <div className="col-sm-8">
        <UserStatus />
        {allposts && allposts.map(post => <Posts key={post._id} info={post} />)}
      </div>
    </div>
  );
};
export default Container;
