import React from "react";
import Post from "../../Widgets/Post/Post";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
const PostList = props => {
  const { match } = props;
  console.log("props", match);
  const {
    userPost: { posts },
    deletePost
  } = props.parentProp;

  const deletePostHandler = postId => {
    deletePost(postId);
  };

  const editPostHandler = id => {
    props.history.push({
      pathname: match.url + `/add-post/${id}`,
      search: "?edit=true"
    });
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
