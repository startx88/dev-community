import React from "react";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";

const LikeDislike = ({ likes, liked, disliked }) => {
  //console.log("l", likes.map(item => item.active && item).length);

  const like = likes.length > 0 && likes.map(item => item.active).length;
  const dislikes = likes.length > 0 && likes.map(item => !item.active).length;

  //console.log("like", like, dislilke);
  return (
    <div className="like-dislike">
      <Button clicked={liked}>
        <span>{like}</span> <Icons icon="thumbs-up" />
      </Button>
      <Button clicked={disliked}>
        <span>{dislikes}</span>
        <Icons icon="thumbs-down" />
      </Button>
    </div>
  );
};
export default LikeDislike;
