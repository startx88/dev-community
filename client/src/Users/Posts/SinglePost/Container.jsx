import React, { useEffect, useCallback } from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import Image from "../../../UI/Image";
import Icons from "../../../UI/Icons";
import Date from "../../../UI/Date";
import Button from "../../../UI/Button";
import LikeButton from "../../../Widgets/LikeButton/LikeButton";
import CommentList from "../../../Widgets/Comment/CommentList";
import CommentForm from "../../../Widgets/Comment/PostComment";
import useAccess from "../../../_hooks/isAuth";
import PostAvatar from "../../../Widgets/Avatar/PostAvatar";
import PostAction from "../../../Widgets/Posts/PostAction";

/******
 *  User single post
 **********************/
const Container = props => {
  const {
    postinfo,
    getPost,
    match: { params }
  } = props;

  const postId = params.id;
  const { user } = useAccess();

  const loadPost = useCallback(
    postId => {
      getPost(postId);
    },
    [getPost]
  );

  useEffect(() => {
    loadPost(postId);
  }, [loadPost, postId]);

  if (!postinfo) {
    return <Spinner />;
  }

  return (
    <div className="single-posts">
      <div className="row">
        <div className="col-sm-9">
          <div className="panel panel-white">
            <div className="posts-image">
              <PostAction postId={postinfo._id} />
              <PostAvatar
                href={"/users/profiles"}
                name={postinfo.name}
                status={postinfo.status}
                avatar={postinfo.user.avatar}
              />
              <Image src={postinfo.avatar} />
              <LikeButton
                classname="bottom"
                postId={postinfo._id}
                likes={postinfo.likes}
              />
            </div>
            <div className="post-title d-flex justify-content-between">
              <h6>{postinfo.title}</h6>
              <Date from={postinfo.insertAt} />
            </div>
            <p>{postinfo.description}</p>
            <div className="leave-comment">
              <CommentList
                user={user}
                postId={postinfo._id}
                comments={postinfo.comments}
              />
              <CommentForm
                user={user}
                history={props.history}
                postId={postinfo._id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
