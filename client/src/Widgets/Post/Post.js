import React from "react";
import Image from "../../UI/Image";
import Icons from "../../UI/Icons";
import Date from "../../UI/Date";
import Button from "../../UI/Button";

const Post = ({ postData, deletePost }) => {
  return (
    <article className="post col-sm-6">
      <Button
        type="button"
        clicked={() => deletePost(postData._id)}
        btnType="dlt-icon"
      >
        <Icons icon="trash-alt" />
      </Button>
      <Image src={postData.avatar} alt={postData.title} />
      <Date from={postData.insertAt} />
      <h6>
        {postData.title}
        <small>{postData.users && postData.users.name}</small>
      </h6>
      <p>{postData.description.substr(0, 100)}...</p>
    </article>
  );
};

export default Post;
