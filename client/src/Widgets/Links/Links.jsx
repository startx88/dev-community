import React from "react";
import { NavLink, Link } from "react-router-dom";

/**
 * Links
 * @param {*} param0
 */
const Links = ({ href, ismenu, title, children, classname }) => {
  return ismenu ? (
    <li className="nav-item">
      <NavLink
        title={title}
        className={["nav-link", classname].join(" ")}
        to={href}
      >
        {children}
      </NavLink>
    </li>
  ) : (
    <Link className={classname} title={title} to={href}>
      {children}
    </Link>
  );
};

export default Links;
