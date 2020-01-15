import React from "react";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";

// LikeButtons
const LikeButton = ({ likes, likeHandler, dislikeHandler }) => {
  const like = likes.length > 0 && likes.filter(item => item.active).length;
  const dislikes =
    likes.length > 0 && likes.filter(item => !item.active).length;
  return (
    <div className="like-buttons">
      <Button clicked={likeHandler}>
        <span>{like ? like : 0}</span> <Icons icon="thumbs-up" />
      </Button>
      <Button clicked={dislikeHandler}>
        <span>{dislikes ? dislikes : 0}</span>
        <Icons icon="thumbs-down" />
      </Button>
    </div>
  );
};
export default LikeButton;
