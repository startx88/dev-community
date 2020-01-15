import React from "react";

const RightCol = props => {
  return (
    <div className={props.isAuth ? "col-sm-3" : "col-sm-3"}>
      {props.children}
    </div>
  );
};

export default RightCol;
