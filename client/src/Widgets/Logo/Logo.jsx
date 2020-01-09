import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DCLogo } from "./logo.svg";
// Logo
const Logo = ({ href, brandname }) => {
  return (
    <div className="logo">
      <Link className="navbar-brand" to={href}>
        <DCLogo width="40" />
        {brandname}
      </Link>
    </div>
  );
};

export default Logo;
