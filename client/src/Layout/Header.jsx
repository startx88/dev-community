import React from "react";
import Logo from "../Widgets/Logo/Logo";
import UserControl from "../Widgets/UserControl";
import Navigation from "./Navigation";

/**********
 *  Header Component
 ***************************/
const Header = ({ admin }) => {
  return (
    <header
      className={[
        "navbar navbar-expand-lg",
        admin ? "navbar-admin" : "navbar-landing"
      ].join(" ")}
    >
      <div className="container">
        {admin ? (
          <>
            <Logo href="/users" brandname="Dev Community" />
            <Navigation />
            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider d-none d-sm-block"></div>
              <UserControl />
            </ul>
          </>
        ) : (
          <Logo href="/" brandname="DC" />
        )}
      </div>
    </header>
  );
};
export default Header;
