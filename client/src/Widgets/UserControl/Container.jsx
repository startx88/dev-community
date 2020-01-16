import React from "react";
import Avatar from "./Avatar";
import Links from "../Links/Links";
import Icons from "../../UI/Icons";
import Image from "../../UI/Image";

const Container = ({ userInfo, sidebar, ...rest }) => {
  const { name, avatar, email, mobile } = userInfo;

  return sidebar ? (
    <div className="user-info">
      <div className="image">
        <Links href="/users/profiles" classname="waves-effect waves-block">
          <Image alt={name} src={avatar} />
        </Links>
      </div>
      <div className="detail mb-3">
        <h4>
          {name}
          <small>Sr. Software Engineer</small>
        </h4>
        <small>{mobile}</small>
      </div>
      <Links
        href="events.html"
        title="Events"
        classname=" waves-effect waves-block"
      >
        <Icons icon="calendar-alt" />
      </Links>
      <a
        href={`mailto:${email}`}
        title="Events"
        className=" waves-effect waves-block"
      >
        <Icons icon="envelope" />
      </a>
      <Links
        href="mail-inbox.html"
        title="Inbox"
        classname=" waves-effect waves-block"
      >
        <Icons icon="comments" />
      </Links>
      <Links
        href="/logout"
        title="Contact List"
        classname=" waves-effect waves-block"
      >
        <Icons icon="power-off" />
      </Links>
    </div>
  ) : (
    <li className="nav-item dropdown user-control no-arrow">
      {userInfo && <Avatar name={name} avatar={avatar} />}
      <div
        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <Links classname="dropdown-item" href="/users/profiles">
          <Icons icon="user" classname="mr-2" />
          Profile
        </Links>
        <Links classname="dropdown-item" href="#">
          <Icons icon="key" classname="mr-2" />
          Forgot password
        </Links>
        <div className="dropdown-divider"></div>
        <Links classname="dropdown-item" href="/logout">
          <Icons icon="lock" classname="mr-2" />
          Logout
        </Links>
      </div>
    </li>
  );
};
export default Container;
