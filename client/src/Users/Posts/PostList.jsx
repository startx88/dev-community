import React from "react";
import Post from "../../Widgets/Post/Post";
import Spinner from "../../UI/Spinner/Spinner";

const PostList = props => {
  const {
    userPost: { posts },
    deletePost
  } = props.parentProp;

  const deletePostHandler = postId => {
    deletePost(postId);
  };

  return (
    <>
      <div className="row">
        {posts ? (
          posts.map(post => (
            <Post
              key={post._id}
              postData={post}
              deletePost={deletePostHandler}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
export default PostList;
