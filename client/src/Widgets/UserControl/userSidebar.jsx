import React from "react";
import Links from "../Links/Links";
import Icons from "../../UI/Icons";
import AvatarSidebar from "../Avatar/AvatarSidebar";

const UserSidebarControl = ({
  user: { name, avatar, mobile, email },
  status
}) => {
  return (
    <div className="sidebar-user">
      <AvatarSidebar name={name} alt={name} avatar={avatar} />
      <div className="detail mb-3">
        <h4>
          {name}
          <small>{status}</small>
        </h4>
        <small>
          {" "}
          <Icons icon="mobile-alt" /> {mobile}
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
    </div>
  );
};

export default UserSidebarControl;
