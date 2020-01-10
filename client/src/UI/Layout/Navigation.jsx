import React from "react";
import Links from "../../Widgets/Links/Links";


import { withRouter } from "react-router-dom";


const Navigation = props => {

  return (
    <nav className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <Links ismenu classname="nav-link" href="/developers">
          Developers
        </Links>
        <Links ismenu classname="nav-link" href={"/courses"}>
          Courses
        </Links>
        <Links ismenu classname="nav-link" href={"/posts"}>
          Posts
        </Links>
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
