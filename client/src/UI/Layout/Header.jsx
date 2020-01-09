import React from "react";
import Logo from "../../Widgets/Logo/Logo";
import Navigation from "./Navigation";
const Header = props => {
  return (
    <header className="navbar navbar-expand-lg navbar-admin">
      <Logo brandname="DC" />
      <Navigation />
    </header>
  );
};
export default Header;
