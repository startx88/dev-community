import React from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
/**
 * Links
 *
 */
const Links = ({ type, href, ismenu, children, classname, ...rest }) => {
  let element = null;
  switch (type) {
    case "ismenu":
      element = (
        <li className="nav-item">
          <NavLink
            className={["nav-link", classname].join(" ")}
            to={href}
            {...rest}
          >
            {children}
          </NavLink>
        </li>
      );
      break;
    case "link":
      element = (
        <Link className={classname} to={href} {...rest}>
          {children}
        </Link>
      );
    default:
      element = (
        <Link className={classname} to={href} {...rest}>
          {children}
        </Link>
      );
      break;
  }
  return element;
};

Links.defaultProps = {
  type: "",
  href: "",
  ismenu: false,
  classname: ""
};

Links.propTypes = {
  type: PropTypes.string,
  href: PropTypes.string,
  ismenu: PropTypes.bool
};

export default Links;
