import React from "react";
import Links from "../Links/Links";
import Image from "../../UI/Image";
import AvatarImage from "./avatar.png";

const AvatarHeader = ({ classname, name, avatar }) => {
  const names = name.split(" ");
  return (
    <Links
      href="#!"
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
        alt={name}
      />
    </Links>
  );
};
export default AvatarHeader;
