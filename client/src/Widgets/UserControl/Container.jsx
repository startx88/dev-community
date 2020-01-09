import React from "react";
import Avatar from "./Avatar";
import Links from "../Links/Links";
import Icons from "../../UI/Icons";
import Image from "../../UI/Image";

const Container = ({ userInfo, sidebar, ...rest }) => {
  const { name, avatar } = userInfo;
  return sidebar ? (
    <div className="user-info">
      <div className="image">
        <Links href="/users/profile" classname="waves-effect waves-block">
          <Image alt={name} src={avatar} />
        </Links>
      </div>
      <div className="detail mb-3">
        <h4>Pradeep Kumar</h4>
        <small>Sr. Software Engineer</small>
      </div>
      <Links
        href="events.html"
        title="Events"
        classname=" waves-effect waves-block"
      >
        <Icons icon="calendar-alt" />
      </Links>
      <Links
        href="events.html"
        title="Events"
        classname=" waves-effect waves-block"
      >
        <Icons icon="envelope" />
      </Links>
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
      {userInfo && <Avatar name={userInfo.name} avatar={userInfo.avatar} />}
      <div
        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <Links classname="dropdown-item" href="#">
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
