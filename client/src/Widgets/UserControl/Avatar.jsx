import React from "react";
import AvatarImage from "./avatar.png";
import { Link } from "react-router-dom";
import Links from "../Links/Links";
import Image from "../../UI/Image";
/**
 * Avatar
 * @param {*} props
 */
const Avatar = ({ username, useravatar, sidebar }) => {
  return sidebar ? (
    <>
      <div className="image">
        <Links href="/users/profile" classname="waves-effect waves-block">
          <Image src={useravatar} />
        </Links>
      </div>
      <div className="detail mb-3">
        <h4>{username}</h4>
        <small>Sr. Software Engineer</small>
      </div>
    </>
  ) : (
    <Link
      to=""
      id="userDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      className="nav-link dropdown-toggle"
    >
      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
        {username}
      </span>
      <img
        width="40"
        className="img-profile rounded-circle"
        alt={""}
        src={useravatar ? useravatar : AvatarImage}
      />
    </Link>
  );
};

export default Avatar;
