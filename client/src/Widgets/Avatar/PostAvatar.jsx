import React from "react";
import Image from "../../UI/Image";
import Date from "../../UI/Date";
import AvatarImage from "./avatar.png";
import { Link } from "react-router-dom";
import Links from "../Links/Links";
import PropTypes from "prop-types";

/**
 * POST AVATAR INFO
 * @param {*} param0
 */
const PostAvatar = ({ id, avatar, status, name, href }) => {
  return (
    <div className="posts-user">
      <div className="posts-user-avatar">
        <Link to={href}>
          <Image
            classname="avatar circle"
            src={avatar ? avatar : AvatarImage}
            alt={name}
          />
        </Link>
        <h6>
          {name}
          <small>{status}</small>
        </h6>
      </div>
    </div>
  );
};

export default PostAvatar;
