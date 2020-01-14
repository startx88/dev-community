import React from "react";
import Image from "../../UI/Image";
import Icons from "../../UI/Icons";
import Date from "../../UI/Date";
import Button from "../../UI/Button";
import LikeDislike from "./like-dislike";

const Post = ({ postData, deletePost, editedPost, liked, disliked, likes }) => {
  //console.log("likes", likes);
  return (
    <article className="post col-sm-6">
      <div className="post-btn">
        <Button
          type="button"
          clicked={() => editedPost(postData._id)}
          btnType="edit-icon"
        >
          <Icons icon="pencil-alt" />
        </Button>
        <Button
          type="button"
          clicked={() => deletePost(postData._id)}
          btnType="dlt-icon"
        >
          <Icons icon="trash-alt" />
        </Button>
      </div>
      <Image src={postData.avatar} alt={postData.title} />
      <div className="d-flex justify-content-between">
        <Date from={postData.insertAt} />
        <LikeDislike
          likes={likes}
          liked={() => liked(postData._id)}
          disliked={() => disliked(postData._id)}
        />
      </div>
      <h6>
        {postData.title}
        <small>{postData.users && postData.users.name}</small>
      </h6>
      <p>{postData.description.substr(0, 100)}...</p>
    </article>
  );
};

export default Post;
