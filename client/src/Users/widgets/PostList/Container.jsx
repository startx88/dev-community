import React from "react";
import Post from "./Post";
import Spinner from "../../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import useAccess from "../../../_hooks/isAuth";
// POST LIST COMPONENT
const PostList = props => {
  const { postdata, deletePost, likePost, dislikePost } = props;
  const { user } = useAccess();

  // DELETE HANDLER
  const deletePostHandler = postId => {
    if (user.isAuth) {
      deletePost(postId);
    } else {
      props.history.push("/login");
    }
  };

  // EDIT HANDLER
  const editPostHandler = id => {
    if (user.isAuth) {
      props.history.push({
        pathname: `/users/posts/add-post/${id}`,
        search: "?edit=true"
      });
    } else {
      props.history.push("/login");
    }
  };

  return (
    <>
      <div className="row">
        {postdata ? (
          postdata.map(post => (
            <Post
              key={post._id}
              isAuth={user}
              postinfo={post}
              likes={post.likes}
              deletePost={deletePostHandler}
              editedPost={editPostHandler}
              classname="col-sm-6 d-flex"
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
export default withRouter(PostList);
