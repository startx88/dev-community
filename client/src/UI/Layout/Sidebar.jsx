import React from "react";
import Links from "../../Widgets/Links/Links";
import Icons from "../../UI/Icons";
import { Scrollbars } from "react-custom-scrollbars";
import { withRouter } from "react-router-dom";
import UserControl from "../../Widgets/UserControl";

/** Sidebar */
const Sidebar = props => {
  const { match, user } = props;

  return (
    <aside
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <div className="menu">
        <UserControl sidebar />
        <hr />
        <ul>
          <Links ismenu classname="nav-link" href="/users">
            <Icons icon="th" />
            Dashboard
          </Links>

          <Links ismenu classname="nav-link" href={"/users/courses"}>
            <Icons icon="long-arrow-alt-right" />
            My Courses
          </Links>

          <Links ismenu classname="nav-link" href={"/users/posts"}>
            <Icons icon="long-arrow-alt-right" />
            My Posts
          </Links>

          <Links ismenu classname="nav-link" href={"/users/profiles"}>
            <Icons icon="long-arrow-alt-right" />
            My Profiles
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

export default withRouter(Sidebar);
