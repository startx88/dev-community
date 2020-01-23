import React, { useCallback, useEffect } from "react";
import Posts from "../../Widgets/Posts/Posts";
import UserStatus from "../widgets/UserStatus/UserStatus";

/////////////
//// Dashboard components
/////////////////////////
const Container = props => {
  const { getAllPosts, allposts, profile } = props;

  // LAOD POST
  const loadUserPost = useCallback(() => {
    getAllPosts();
  }, [getAllPosts]);

  // LOAD POST AFTER RENDER
  useEffect(() => {
    loadUserPost();
  }, [loadUserPost]);

  return (
    <div className="row">
      <div className="col-sm-8">
        <UserStatus />
        {!allposts ? (
          <img alt="" src={process.env.PUBLIC_URL + "/loader.gif"} />
        ) : (
          allposts.map(post => <Posts key={post._id} info={post} />)
        )}
      </div>
    </div>
  );
};
export default Container;
