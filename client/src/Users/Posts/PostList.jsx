import React from "react";
import Post from "../../Widgets/Post/Post";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

const PostList = props => {
  const { match, parentProp } = props;

  const {
    postData: { posts },
    deletePost,
    likePost,
    dislikePost
  } = parentProp;

  const deletePostHandler = postId => {
    deletePost(postId);
  };

  const editPostHandler = id => {
    props.history.push({
      pathname: match.url + `/add-post/${id}`,
      search: "?edit=true"
    });
  };

  // Likes button
  const likePostHandler = postId => {
    likePost(postId);
  };

  const dislikePostHandler = postId => {
    dislikePost(postId);
  };

  return (
    <>
      <div className="row">
        {posts ? (
          posts.map(post => (
            <Post
              key={post._id}
              postinfo={post}
              deletePost={deletePostHandler}
              editedPost={editPostHandler}
              likes={post.likes}
              likeHandler={likePostHandler}
              dislikeHandler={dislikePostHandler}
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
