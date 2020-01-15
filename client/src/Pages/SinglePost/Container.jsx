import React, { useEffect, useState } from "react";
import axios from "../../axios_instance";
import Spinner from "../../UI/Spinner/Spinner";
import Image from "../../UI/Image";
import Icons from "../../UI/Icons";
import Date from "../../UI/Date";
import Button from "../../UI/Button";
import LikeButton from "../../Widgets/LikeButton/LikeButton";
import CommentForm from "./CommentForm";
const Container = props => {
  const [postinfo, setPostInfo] = useState(null);
  const postId = props.match.params.id;

  const loadPost = async () => {
    const responose = await axios.get("/posts/" + postId);
    const responseData = await responose.data;
    console.log(responseData);
    setPostInfo(responseData.data);
  };

  useEffect(() => {
    loadPost();
  }, []);

  if (!postinfo) {
    return <Spinner />;
  }

  return (
    <div className="single-post">
      <div className="row">
        <div className="col-sm-9">
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
            <LikeButton likes={postinfo.likes} />
          </div>
          <h2>{postinfo.title}</h2>
          <p>{postinfo.description}</p>
          <div className="leave-comment">
            <h4>Leave a Comment</h4>
            <CommentForm user={postinfo.users} postId={postinfo._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
