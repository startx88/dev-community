import React from "react";
import Links from "../../Widgets/Links/Links";
import Icons from "../../UI/Icons";

import { withRouter } from "react-router-dom";

const Navigation = props => {
  return (
    <nav className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <Links title="Projects" ismenu classname="nav-link" href={"/posts"}>
          <Icons icon="list-alt" />
        </Links>
        <Links
          title="Developers"
          ismenu
          classname="nav-link"
          href="/developers"
        >
          <Icons icon="users" />
        </Links>
        <Links
          title="Notifications"
          ismenu
          classname="nav-link"
          href={"/posts"}
        >
          <Icons icon="bell" />
        </Links>
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
