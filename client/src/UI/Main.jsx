import React from "react";

const Main = ({ classname, children }) => {
  return (
    <div className={["container-fluid", classname].join(" ")}>{children}</div>
  );
};

export default Main;
