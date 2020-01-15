import React from "react";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";

const Comment = props => {
  const { comments } = props;
  const deleteCommentHandler = id => {};
  return (
    <div className="comments">
      <h4>Comments</h4>
      <ul>
        {comments.map(comment => (
          <li id={comment._id}>
            <Button
              clicked={() => deleteCommentHandler(comment._id)}
              btnType="dlt-icon"
            >
              <Icons icon="trash-alt" />
            </Button>
            <h6>{comment.name}</h6>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
