import React, { useEffect, useState } from "react";
import axios from "../../axios_instance";
import Spinner from "../../UI/Spinner/Spinner";
import Image from "../../UI/Image";
import Icons from "../../UI/Icons";
import Date from "../../UI/Date";
import Button from "../../UI/Button";
import LikeButton from "../../Widgets/LikeButton/LikeButton";
import CommentForm from "./CommentForm";
import Section from "../../UI/Layout/Section";
import Comments from "../../Widgets/Comment/Comment";
import useAccess from "../../_hooks/isAuth";
const Container = props => {
  const [postinfo, setPostInfo] = useState(null);
  const postId = props.match.params.id;
  const { user } = useAccess();
  const loadPost = async () => {
    const responose = await axios.get("/posts/" + postId);
    const responseData = await responose.data;
    setPostInfo(responseData.data);
  };

  useEffect(() => {
    loadPost();
  }, []);

  if (!postinfo) {
    return <Spinner />;
  }

  // LOGIN REDIRECT
  const backToLogin = () => {
    if (user.isAuth) {
    } else {
      props.history.push("/login");
    }
  };

  return (
    <Section>
      {user => {
        return (
          <>
            <Section.LeftCol {...user}>
              <div className="single-post">
                <div className="post-user-info d-flex justify-content-between">
                  <div className="post-user">
                    by <small>{postinfo.users.name}</small>
                  </div>
                  <div className="post-date-comment">
                    <Date icon from={postinfo.insertAt} />
                    <Button>
                      <Icons icon="comment-alt" /> 0
                    </Button>
                  </div>
                </div>
                <div className="like">
                  <Image classname="single-post-image" src={postinfo.avatar} />
                  <LikeButton
                    likeHandler={backToLogin}
                    dislikeHandler={backToLogin}
                    likes={postinfo.likes}
                  />
                </div>
                <h2>{postinfo.title}</h2>
                <p>{postinfo.description}</p>
                <Comments comments={postinfo.comments} />
                <div className="leave-comment">
                  <h4>Leave a Comment</h4>
                  <CommentForm user={postinfo.users} postId={postinfo._id} />
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
