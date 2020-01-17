import React from "react";

const LeftCol = props => {
  return (
    <div className={props.isAuth ? "col-sm-9" : "col-sm-9"}>
      {props.children}
    </div>
  );
};

export default LeftCol;