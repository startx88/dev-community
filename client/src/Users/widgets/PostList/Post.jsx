import React from "react";
import Image from "../../../UI/Image";
import Icons from "../../../UI/Icons";
import Date from "../../../UI/Date";
import Button from "../../../UI/Button";
import LikeButton from "../../../Widgets/LikeButton/LikeButton";
import Links from "../../../Widgets/Links/Links";
import { withRouter } from "react-router-dom";
import PostAction from "../../../Widgets/Posts/PostAction";

// Post Component
const Post = ({
  isAuth,
  postinfo,
  deletePost,
  editedPost,
  likeHandler,
  dislikeHandler,
  likes,
  classname,
  ...rest
}) => {
  const { match } = rest;
  return (
    <article className={classname}>
      <div className="post panel panel-white">
        {isAuth.isAuth && isAuth.user._id === postinfo.user._id && (
          <PostAction postId={postinfo._id} />
        )}
        <Links classname="post-image" to={`${match.path}/` + postinfo._id}>
          <Image src={postinfo.avatar} alt={postinfo.title} />
        </Links>
        <div className="d-flex justify-content-between">
          <Date from={postinfo.insertAt} />
          <LikeButton likes={likes} postId={postinfo._id} />
        </div>
        <h6>
          {postinfo.title}
          <small>{postinfo.users && postinfo.users.name}</small>
        </h6>
        <p>{postinfo.description.substr(0, 100)}...</p>
      </div>
    </article>
  );
};

export default withRouter(Post);
