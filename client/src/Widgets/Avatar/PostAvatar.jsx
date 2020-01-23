import React from "react";
import Image from "../../UI/Image";
import AvatarImage from "./avatar.png";
import Links from "../Links/Links";

/**
 * POST AVATAR INFO
 * @param {*} param0
 */
const PostAvatar = ({ id, avatar, status, name, href }) => {
  return (
    <div className="posts-user">
      <div className="posts-user-avatar">
        <Links to={href}>
          <Image
            classname="avatar circle"
            src={avatar ? avatar : AvatarImage}
            alt={name}
          />
        </Links>
        <h6>
          {name}
          <small>{status}</small>
        </h6>
      </div>
    </div>
  );
};

export default PostAvatar;
