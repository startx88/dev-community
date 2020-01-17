import React from "react";
import LeftCol from "./LeftCol";
import RightCol from "./RightCol";
import useAccess from "../../../_hooks/isAuth";

/** Admin Content */
const Section = ({ children, classname }) => {
  const { user } = useAccess();
  console.log("user", user);
  return (
    <div className={[user.isAuth && "in-user", classname].join(" ")}>
      <div className="row">{children(user)}</div>
    </div>
  );
};

Section.LeftCol = LeftCol;
Section.RightCol = RightCol;

export default Section;
