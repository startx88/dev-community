import React from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Image from "../../UI/Image";
import Avatar from "../Avatar/Avatar";

// Post Comment
const PostComment = ({ classname, avatar }) => {
  return (
    <div className="posts-add-comment">
      <Avatar classname="avatar circle" />
      <form>
        <Input inputtype="textarea" placeholder="add status" />
        <Button btnType="primary">ADD</Button>
      </form>
    </div>
  );
};
export default PostComment;
