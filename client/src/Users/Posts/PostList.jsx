import React from "react";
import Post from "../../Widgets/Post/Post";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

const PostList = props => {
  console.log("postlist", props);
  const { match, parentProp } = props;

  const {
    postData: { posts },
    likes,
    dislikes,
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

  const likedPost = postId => {
    likePost(postId);
  };

  const dislikedPost = postId => {
    dislikePost(postId);
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
              editedPost={editPostHandler}
              likes={post.likes}
              liked={likedPost}
              disliked={dislikedPost}
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
