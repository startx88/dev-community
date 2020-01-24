import React from "react";
import PostAvatar from "../Avatar/PostAvatar";
import Image from "../../UI/Image";
import Date from "../../UI/Date";
import LikeButton from "../LikeButton/LikeButton";
import CommentList from "../Comment/CommentList";
import PostComment from "../Comment/PostComment";
import { withRouter } from "react-router-dom";
import useAccess from "../../_hooks/isAuth";
import PostAction from "./PostAction";

const Posts = ({ info, ...rest }) => {
  const { user } = useAccess();

  return info ? (
    <div className="panel panel-white post">
      <PostAction postId={info._id} />

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

      <div className="post-image">
        <Image src={info.avatar} alt="" />
        <LikeButton classname="bottom" likes={info.likes} postId={info._id} />
      </div>

      <div className="post-title d-flex justify-content-between">
        <h6>{info.title}</h6>
        <Date from={info.insertAt} />
      </div>

      <p>{info.description}</p>
      <div className="leave-comment">
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
