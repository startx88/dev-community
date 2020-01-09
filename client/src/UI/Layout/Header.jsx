import React from "react";
import Logo from "../../Widgets/Logo/Logo";
import Notification from "../../Widgets/Notification";
import UserControl from "../../Widgets/UserControl";

const Header = props => {
  const { user } = props;
  return (
    <header className="navbar navbar-expand-lg navbar-admin">
      <Logo brandname="DC" />
      <ul className="navbar-nav ml-auto">
        <Notification />
        <div className="topbar-divider d-none d-sm-block"></div>
        {user.user && <UserControl userInfo={user.user} />}
      </ul>
    </header>
  );
};
export default Header;
