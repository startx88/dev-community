import React from "react";
import Links from "../Widgets/Links/Links";
import Icons from "../UI/Icons";
import UserControl from "../Widgets/UserControl";

/** Sidebar */
const Sidebar = props => {
  const { status } = props;

  return (
    <aside
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <div className="menu">
        <UserControl sidebar status={status} />
        <ul>
          <hr />
          <Links ismenu classname="nav-link" href="/users">
            <Icons icon="th" />
            Dashboard
          </Links>

          <Links ismenu classname="nav-link" href={"/users/posts"}>
            <Icons icon="long-arrow-alt-right" />
            Posts
          </Links>
          <Links ismenu classname="nav-link" href={"/users/courses"}>
            <Icons icon="long-arrow-alt-right" />
            Projects
          </Links>

          <Links ismenu classname="nav-link" href={"/users/profiles"}>
            <Icons icon="long-arrow-alt-right" />
            Profiles
          </Links>
          <hr />
          <Links ismenu classname="nav-link" href={"/users/settings"}>
            <Icons icon="cog" />
            Settings
          </Links>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
