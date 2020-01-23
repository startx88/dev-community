import React from "react";
import Links from "../Links/Links";
import Icons from "../../UI/Icons";
import AvatarHeader from "../Avatar/AvatarHeader";

const UserHeaderControl = ({ name, avatar }) => {
  return (
    <li className="nav-item dropdown navbar-user-control">
      <AvatarHeader name={name} avatar={avatar} />
      <div
        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <Links classname="dropdown-item" href="/users/profiles">
          <Icons icon="user" classname="mr-2" />
          Profile
        </Links>
        <Links classname="dropdown-item" href="/users/settings/forgot-password">
          <Icons icon="key" classname="mr-2" />
          Forgot password
        </Links>
        <Links classname="dropdown-item" href="/logout">
          <Icons icon="lock" classname="mr-2" />
          Logout
        </Links>
      </div>
    </li>
  );
};

export default UserHeaderControl;
