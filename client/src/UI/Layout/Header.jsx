import React from "react";
import Logo from "../../Widgets/Logo/Logo";
import Notification from "../../Widgets/Notification";
import UserControl from "../../Widgets/UserControl";
import Links from "../../Widgets/Links/Links";

const Header = ({ admin, user, ...rest }) => {
  return admin ? (
    <header className="navbar navbar-expand-lg navbar-admin">
      <Logo href="/users" brandname="Dev Community" />
      <ul className="navbar-nav ml-auto">
        <Notification />
        <div className="topbar-divider d-none d-sm-block"></div>
        {user.users && <UserControl userInfo={user.users} />}
      </ul>
    </header>
  ) : (
    <header className="navbar navbar-expand-lg navbar-landing">
      <div className="container">
        <Logo href="/" brandname="DC" />
        <ul className="navbar-nav ml-auto">
          <Links ismenu classname="nav-link" href="/developers">
            Developers
          </Links>
          <Links ismenu classname="nav-link" href="/courses">
            Courses
          </Links>
          <Links ismenu classname="nav-link" href="/posts">
            Posts
          </Links>
        </ul>
      </div>
    </header>
  );
};
export default Header;
