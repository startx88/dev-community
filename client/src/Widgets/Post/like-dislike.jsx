import React from "react";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";

const LikeDislike = ({ like, dislike, liked, disliked }) => {
  return (
    <div className="like-dislike">
      <Button>
        <span>10</span> <Icons icon="thumbs-up" />
      </Button>
      <Button>
        <span>10</span>
        <Icons icon="thumbs-down" />
      </Button>
    </div>
  );
};
export default LikeDislike;
