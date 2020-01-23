import React from "react";
import PostAvatar from "../Avatar/PostAvatar";
import Image from "../../UI/Image";
import LikeButton from "../LikeButton/LikeButton";
import CommentList from "../Comment/CommentList";
import PostComment from "../Comment/PostComment";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAccess from "../../_hooks/isAuth";
import PostAction from "./PostAction";
import { likePost, dislikePost, deletePost } from "../../Stores/Actions";

const Posts = ({ info, ...rest }) => {
  const dispatch = useDispatch();
  const { user } = useAccess();

  // DELETE HANDLER
  const deletePostHandler = postId => {
    if (user.isAuth) {
      dispatch(deletePost(postId));
    } else {
      rest.history.push("/login");
    }
  };

  // LIKE HANDLER
  const likePostHandler = postId => {
    if (user.isAuth) {
      dispatch(likePost(postId));
    } else {
      rest.history.push("/login");
    }
  };

  // DISLIKE HANDLER
  const dislikePostHandler = postId => {
    if (user.isAuth) {
      dispatch(dislikePost(postId));
    } else {
      rest.history.push("/login");
    }
  };

  console.log("info", info, user);

  return info ? (
    <div className="panel panel-white posts">
      {info.user === user.user._id && (
        <PostAction deleted={() => deletePostHandler(info._id)} />
      )}
      <PostAvatar
        href={{
          pathname: `/developers/${info.user}`,
          hash: "#info"
        }}
        name={info.user.name}
        status={info.status}
        avatar={info.user.avatar}
        date={info.insertAt}
      />
      <Image classname="posts-image" src={info.avatar} alt="" />
      <div className="posts-body">
        <p>{info.description}</p>
      </div>
      <LikeButton
        likes={info.likes}
        likeHandler={() => likePostHandler(info._id)}
        dislikeHandler={() => dislikePostHandler(info._id)}
      />
      <div className="posts-comments">
        {user.user && (
          <CommentList postId={info._id} user={user} comments={info.comments} />
        )}
      </div>
      {user.user && (
        <PostComment history={rest.history} user={user} postId={info._id} />
      )}
    </div>
  ) : (
    <p>There is no posts</p>
  );
};

export default withRouter(Posts);
