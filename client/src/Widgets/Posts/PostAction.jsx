import React from "react";
import Links from "../Links/Links";
import Icons from "../../UI/Icons";
import Button from "../../UI/Button";

/*********
 * Post action compoent
 ***********************/
const PostAction = ({ edited, deleted, hide }) => {
  return (
    <div className="post-action">
      <Links data-toggle="dropdown" href="#!">
        <Icons icon="ellipsis-v" />
      </Links>
      <div className="dropdown-menu dropdown-menu-right">
        <Button clicked={edited} classname="dropdown-item" href="#">
          <Icons icon="pencil-alt" /> Edit
        </Button>
        <Button clicked={deleted} classname="dropdown-item" href="#">
          <Icons icon="trash-alt" /> Delete
        </Button>
        <Button clicked={hide} classname="dropdown-item" href="#">
          <Icons icon="eye" /> Hide
        </Button>
      </div>
    </div>
  );
};

export default PostAction;
