import React, { useCallback, useEffect } from "react";
import Posts from "../../Widgets/Posts/Posts";
import Spinner from "../../UI/Spinner/Spinner";
/////////////
//// Dashboard components
/////////////////////////
const Container = props => {
  const { getAllPosts, allposts } = props;

  // LAOD POST
  const loadUserPost = useCallback(() => {
    getAllPosts();
  }, [getAllPosts]);

  // LOAD POST AFTER RENDER
  useEffect(() => {
    loadUserPost();
  }, [loadUserPost]);

  return allposts && allposts.length === 0 ? (
    <div className="no-post" />
  ) : !allposts ? (
    <Spinner />
  ) : (
    <div className="row">
      <div className="col-sm-8">
        {allposts.map(post => (
          <Posts key={post._id} postinfo={post} postId={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Container;
