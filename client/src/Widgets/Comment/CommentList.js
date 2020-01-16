import React from "react";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";
import useAccess from "../../_hooks/isAuth";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../Stores/Actions";
///////
/// Comment Component
/////////////
const Comment = ({ postId, comments }) => {
  const dispatch = useDispatch();
  const { user } = useAccess();

  // Delete Comment
  const deleteCommentHandler = commentId => {
    dispatch(deleteComment(postId, commentId));
  };

  return (
    <div className="comments">
      <h4>Comments</h4>
      <ul>
        {comments.map(comment => (
          <li id={comment._id}>
            {user.isAuth && (
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
  );
};

export default Comment;
