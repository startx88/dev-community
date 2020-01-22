import React from "react";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";
import useAccess from "../../_hooks/isAuth";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../Stores/Actions";

////////
/// Comment Component
/////////////
const Comment = ({ postId, user, comments }) => {
  const dispatch = useDispatch();

  // Delete Comment
  const deleteCommentHandler = commentId => {
    dispatch(deleteComment(postId, commentId));
  };

  return (
    comments && (
      <div className="comments">
        <ul>
          {comments.map(comment => (
            <li key={comment._id}>
              {comment.user === user.user._id && (
                <Button
                  clicked={() => deleteCommentHandler(comment._id)}
                  btnType="dlt-icon"
                >
                  <Icons icon="trash-alt" />
                </Button>
              )}
              <h6>{comment.name}</h6>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Comment;
