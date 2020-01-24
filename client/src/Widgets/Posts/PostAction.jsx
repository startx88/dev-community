import React from "react";
import Links from "../Links/Links";
import Icons from "../../UI/Icons";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { deletePost } from "../../Stores/Actions";

/*********
 * Post action compoent
 ***********************/
const PostAction = ({ postId }) => {
  const dispatch = useDispatch();

  const editHandler = () => {};

  const hideHandler = () => {
    alert("We are working on it");
  };

  return (
    <div className="post-action">
      <Links data-toggle="dropdown" href="#!">
        <Icons icon="ellipsis-v" />
      </Links>
      <div className="dropdown-menu dropdown-menu-right">
        <Button clicked={editHandler} classname="dropdown-item" href="#">
          <Icons icon="pencil-alt" /> Edit
        </Button>
        <Button
          clicked={() => dispatch(deletePost(postId))}
          classname="dropdown-item"
          href="#"
        >
          <Icons icon="trash-alt" /> Delete
        </Button>
        <Button clicked={hideHandler} classname="dropdown-item" href="#">
          <Icons icon="eye" /> Hide
        </Button>
      </div>
    </div>
  );
};

export default PostAction;
