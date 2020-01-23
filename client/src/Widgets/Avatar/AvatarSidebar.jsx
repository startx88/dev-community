import React from "react";
import Links from "../Links/Links";
import Image from "../../UI/Image";
import AvatarImage from "./avatar.png";

const AvatarSidebar = ({ classname, name, avatar }) => {
  return (
    <div className="image">
      <Links href="/users/profiles" className="waves-effect waves-block">
        <Image src={avatar ? avatar : AvatarImage} alt={name} />
      </Links>
    </div>
  );
};
export default AvatarSidebar;
