import React from "react";
import Logo from "../../Widgets/Logo/Logo";
import Notification from "../../Widgets/Notification";
import UserControl from "../../Widgets/UserControl";

const Header = props => {
  const { user } = props;
  return (
    <header className="navbar navbar-expand-lg navbar-admin">
      <Logo href="/users" brandname="Dev Community" />
      <ul className="navbar-nav ml-auto">
        <Notification />
        <div className="topbar-divider d-none d-sm-block"></div>
        {user.users && <UserControl userInfo={user.users} />}
      </ul>
    </header>
  );
};
export default Header;
