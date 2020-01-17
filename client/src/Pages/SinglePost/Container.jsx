import React, { useEffect, useCallback } from "react";
import axios from "../../axios_instance";
import Spinner from "../../UI/Spinner/Spinner";
import Image from "../../UI/Image";
import Icons from "../../UI/Icons";
import Date from "../../UI/Date";
import Button from "../../UI/Button";
import LikeButton from "../../Widgets/LikeButton/LikeButton";
import CommentForm from "./CommentForm";
import Section from "../../UI/Layout/Section";
import CommentList from "../../Widgets/Comment/CommentList";
import useAccess from "../../_hooks/isAuth";
import Avatar from "../../Widgets/Avatar/Avatar";
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

  console.log("single", postinfo);
  return (
    <Section>
      {user => {
        return !postinfo ? (
          <Spinner />
        ) : (
          <>
            <Section.LeftCol {...user}>
              <div className="single-post panel panel-white">
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
                <CommentList
                  postId={postinfo._id}
                  comments={postinfo.comments}
                />

                <div className="leave-comment">
                  <h4>Leave a Comment</h4>
                  <CommentForm user={postinfo.user} postId={postinfo._id} />
                </div>
              </div>
            </Section.LeftCol>
            <Section.RightCol {...user}>
              <h1>Hello world</h1>
            </Section.RightCol>
          </>
        );
      }}
    </Section>
  );
};

export default Container;