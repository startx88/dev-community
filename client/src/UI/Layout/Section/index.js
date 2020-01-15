import React from "react";
import LeftCol from "./LeftCol";
import RightCol from "./RightCol";
import useAccess from "../../../_hooks/isAuth";

/** Admin Content */
const Section = ({ children, classname }) => {
  const { user } = useAccess();
  return (
    <div className={[classname, user.isAuth && "in-user"].join(" ")}>
      <div className="row">{children(user)}</div>
    </div>
  );
};

Section.LeftCol = LeftCol;
Section.RightCol = RightCol;

export default Section;
