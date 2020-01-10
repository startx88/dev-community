import React from "react";

const Main = ({ classname, children }) => {
  return <div className={classname}>{children}</div>;
};

export default Main;
