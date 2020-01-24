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

const Posts = ({ postinfo, ...rest }) => {
  const { user } = useAccess();

  return postinfo ? (
    <div className="panel panel-white post">
      {postinfo.user._id === user.user._id && (
        <PostAction postId={postinfo._id} />
      )}
      <PostAvatar
        href={{
          pathname: `/developers/${postinfo.user._id}`,
          hash: "#info"
        }}
        name={postinfo.user.name}
        status={postinfo.status}
        avatar={postinfo.user.avatar}
        date={postinfo.insertAt}
      />

      <div className="post-image">
        <Image src={postinfo.avatar} alt="" />
        <LikeButton
          classname="bottom"
          likes={postinfo.likes}
          postId={postinfo._id}
        />
      </div>

      <div className="post-title d-flex justify-content-between">
        <h6>{postinfo.title}</h6>
        <Date from={postinfo.insertAt} />
      </div>

      <p>{postinfo.description}</p>
      <div className="leave-comment">
        {user.user && (
          <CommentList
            postId={postinfo._id}
            user={user}
            comments={postinfo.comments}
          />
        )}
      </div>
      {user.user && (
        <PostComment history={rest.history} user={user} postId={postinfo._id} />
      )}
    </div>
  ) : (
    <p>There is no posts</p>
  );
};

export default withRouter(Posts);
