import React from "react";
import Logo from "../../Widgets/Logo/Logo";

import UserControl from "../../Widgets/UserControl";
import Links from "../../Widgets/Links/Links";
import Navigation from "./Navigation";

const Header = ({ admin, user, ...rest }) => {

  return admin ? (
    <header className="navbar navbar-expand-lg navbar-admin">
      <div className="container">
        <Logo href="/users" brandname="Dev Community" />
        <Navigation />
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          {user.users && <UserControl userInfo={user.users} />}
        </ul>
      </div>
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
