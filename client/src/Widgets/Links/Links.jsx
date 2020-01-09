import React from "react";
import { NavLink, Link } from "react-router-dom";

/**
 * Links
 * @param {*} param0
 */
const Links = ({ href, ismenu, children, classname }) => {
  return ismenu ? (
    <li className="nav-item">
      <NavLink className={["nav-link", classname].join(" ")} to={href}>
        {children}
      </NavLink>
    </li>
  ) : (
    <Link className={classname} to={href}>
      {children}
    </Link>
  );
};

export default Links;
