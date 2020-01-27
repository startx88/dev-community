import React from "react";
import Image from "../../UI/Image";
import AvatarImage from "./avatar.png";
import Links from "../Links/Links";

/**
 * POST AVATAR INFO
 * @param {*} param0
 */
const PostAvatar = ({ avatar, status, name, href, classname }) => {
  return (
    <div className={["post-avatar", classname].join(" ")}>
      <Links to={href ? href : "#!"}>
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
  );
};

export default PostAvatar;
