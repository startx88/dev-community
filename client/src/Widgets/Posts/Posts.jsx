import React from "react";
import PostAvatar from "../Avatar/PostAvatar";
import Image from "../../UI/Image";
import LikeButton from "../LikeButton/LikeButton";
import CommentList from "../Comment/CommentList";
import PostComment from "../Comment/PostComment";

const Posts = ({ info, status, deleted, ...rest }) => {
  return (
    <div className="panel panel-white posts">
      <PostAvatar
        name={info.user.name}
        status={status}
        avatar={info.user.avatar}
        date={info.insertAt}
      />

      <Image classname="posts-image" src={info.avatar} alt="" />

      <div className="posts-body">
        <p>{info.description}</p>
      </div>
      <LikeButton likes={info.likes} />
      <div className="posts-comments">
        <CommentList comments={info.comments} />
      </div>

      <PostComment />
    </div>
  );
};

export default Posts;
