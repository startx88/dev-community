import React from "react";
import Avatar from "./Avatar";
import Links from "../Links/Links";
import Icons from "../../UI/Icons";
import Image from "../../UI/Image";
import Spinner from "../../UI/Spinner/Spinner";

// User control
const Container = ({ userinfo, sidebar, ...rest }) => {
  const { isAuth, user } = userinfo;

  if (!user) {
    return <Spinner />;
  }

  return sidebar ? (
    <div className="sidebar-user">
      <div className="image">
        <Links href="/users/profiles" classname="waves-effect waves-block">
          <Image alt={user.name} src={user.avatar} />
        </Links>
      </div>
      <div className="detail mb-3">
        <h4>
          {user.name}
          <small>Sr. Software Engineer</small>
        </h4>
        <small>
          {" "}
          <Icons icon="mobile-alt" /> {user.mobile}
        </small>
      </div>
      <div className="sidebar-social">
        <Links
          href="events.html"
          title="Events"
          classname=" waves-effect waves-block"
        >
          <Icons icon="calendar-alt" />
        </Links>
        <a
          href={`mailto:${user.email}`}
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
    </div>
  ) : (
    <li className="nav-item dropdown user-control no-arrow">
      {user && <Avatar username={user.name} useravatar={user.avatar} />}
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
