import React from "react";
import Links from "../../Widgets/Links/Links";
import Icons from "../../UI/Icons";
import { Scrollbars } from "react-custom-scrollbars";
import { withRouter } from "react-router-dom";
import UserControl from "../../Widgets/UserControl";

const Navigation = props => {
  const { match } = props;
  return (
    <nav className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <Links ismenu classname="nav-link" href={match.path}>
          Dashboard
        </Links>
        <Links ismenu classname="nav-link" href={match.path + "/courses"}>
          Courses
        </Links>

        <Links ismenu classname="nav-link" href={match.path + "/posts"}>
          Posts
        </Links>

        <Links ismenu classname="nav-link" href={match.path + "/profiles"}>
          Profiles
        </Links>

        <Links ismenu classname="nav-link" href={match.path + "/settings"}>
          Settings
        </Links>
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
