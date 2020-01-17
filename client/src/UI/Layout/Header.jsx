import React from "react";
import Logo from "../../Widgets/Logo/Logo";
import UserControl from "../../Widgets/UserControl";
import Links from "../../Widgets/Links/Links";
import Navigation from "./Navigation";

const Header = ({ admin, auth, ...rest }) => {
  return admin ? (
    <header className="navbar navbar-expand-lg navbar-admin">
      <div className="container">
        <Logo href="/users" brandname="Dev Community" />
        <Navigation />
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          {auth.isAuth && <UserControl />}
        </ul>
      </div>
    </header>
  ) : (
    <header className="navbar navbar-expand-lg navbar-landing">
      <div className="container">
        <Logo href="/" brandname="DC" />
        <Navigation />
      </div>
    </header>
  );
};
export default Header;
