import React from "react";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";
import { useDispatch } from "react-redux";
import { likePost, dislikePost } from "../../Stores/Actions";

// LikeButtons
const LikeButton = ({ postId, likes, classname }) => {
  // Dispatch
  const dispatch = useDispatch();

  const like = likes.length > 0 && likes.filter(item => item.active).length;
  const dislikes =
    likes.length > 0 && likes.filter(item => !item.active).length;

  return (
    <div className={["like-buttons", classname].join(" ")}>
      <Button clicked={() => dispatch(likePost(postId))}>
        <Icons icon="heart" /> <span>{like ? like : 0}</span>
      </Button>
      <Button clicked={() => dispatch(dislikePost(postId))}>
        <Icons icon="heart-broken" />
        <span>{dislikes ? dislikes : 0}</span>
      </Button>
    </div>
  );
};
export default LikeButton;
