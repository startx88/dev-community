import React from "react";
import Spinner from "../../UI/Spinner/Spinner";
import UserSidebarControl from "./userSidebar";
import UserHeaderControl from "./userHeader";

// User control
const Container = ({ userinfo, status, sidebar, ...rest }) => {
  const { user } = userinfo;
  if (!user) {
    return <Spinner />;
  }
  return sidebar ? (
    <UserSidebarControl user={user} status={status} />
  ) : (
    <UserHeaderControl name={user.name} avatar={user.avatar} />
  );
};
export default Container;
