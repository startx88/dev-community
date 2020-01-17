import React from "react";
import Post from "./Post";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import useAccess from "../../_hooks/isAuth";
// POST LIST COMPONENT
const PostList = props => {
  const { postdata, deletePost, likePost, dislikePost } = props;
  const { user } = useAccess();
  console.log(postdata);

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

  // LIKE HANDLER
  const likePostHandler = postId => {
    if (user.isAuth) {
      likePost(postId);
    } else {
      props.history.push("/login");
    }
  };

  // DISLIKE HANDLER
  const dislikePostHandler = postId => {
    if (user.isAuth) {
      dislikePost(postId);
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
              likeHandler={likePostHandler}
              dislikeHandler={dislikePostHandler}
              classname="col-sm-6"
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
