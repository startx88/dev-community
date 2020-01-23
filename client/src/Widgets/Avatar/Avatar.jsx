import React from "react";
import Image from "../../UI/Image";
import AvatarImage from "./avatar.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Avatar Component
const Avatar = ({ type, name, href, avatar, alt, classname, mobile }) => {
  let element = null;
  switch (type) {
    case "sidebar":
      element = (
        <div className="image">
          <Link to="" className="waves-effect waves-block">
            <Image src={avatar ? avatar : AvatarImage} alt={alt} />
          </Link>
        </div>
      );
      break;
    case "header":
      const names = name.split(" ");
      element = (
        <Link
          to=""
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          className="nav-link dropdown-toggle"
        >
          {names[0][0] + "" + names[1][0]}
          <Image
            classname="img-profile rounded-circle"
            src={avatar ? avatar : AvatarImage}
            alt={alt}
          />
        </Link>
      );
      break;
    default:
      element = (
        <Image
          classname={classname}
          src={avatar ? avatar : AvatarImage}
          alt={alt}
        />
      );
      break;
  }
  return element;
};

Avatar.defaultProps = {
  type: "",
  name: "",
  avatar: "",
  alt: "",
  classname: ""
};

Avatar.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired
};
export default Avatar;
