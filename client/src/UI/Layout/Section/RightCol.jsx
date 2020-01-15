import React from "react";

const RightCol = props => {
  return (
    <div className={props.isAuth ? "col-sm-4" : "col-sm-3"}>
      {props.children}
    </div>
  );
};

export default RightCol;
