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
import Avatar from "../../../Widgets/Avatar/Avatar";

////////
// Single Post Compoent
///////////////////////
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
  }, [loadPost]);

  // LOGIN REDIRECT
  const backToLogin = () => {
    if (user.isAuth) {
    } else {
      props.history.push("/login");
    }
  };

  if (!postinfo) {
    return <Spinner />;
  }

  return (
    <div className="row">
      <div className="col-sm-8">
        <div className={"single-post  panel panel-white"}>
          <div className="post-user-info d-flex justify-content-between">
            <div className="post-user">
              by <small>{postinfo.user.name}</small>
            </div>
            <div className="post-date-comment">
              <Date icon from={postinfo.insertAt} />
              <Button>
                <Icons icon="comment-alt" /> 0
              </Button>
            </div>
          </div>
          <div className="single-post-image">
            <Avatar classname="avatar" avatar={postinfo.user.avatar} />
            <Image classname="full" src={postinfo.avatar} />
            <LikeButton
              likeHandler={backToLogin}
              dislikeHandler={backToLogin}
              likes={postinfo.likes}
            />
          </div>
          <h6>{postinfo.title}</h6>
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
  );
};

export default Container;
