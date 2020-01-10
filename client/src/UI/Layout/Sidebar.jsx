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
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <div className="menu">
          {user.users && <UserControl sidebar userInfo={user.users} />}
          <hr />
          <ul>
            <Links ismenu classname="nav-link" href={match.path}>
              <Icons icon="th" />
              Dashboard
            </Links>

            <Links ismenu classname="nav-link" href={match.path + "/brands"}>
              <Icons icon="long-arrow-alt-right" />
              Brands
            </Links>

            <Links ismenu classname="nav-link" href={match.path + "/category"}>
              <Icons icon="long-arrow-alt-right" />
              Category
            </Links>

            <Links
              ismenu
              classname="nav-link"
              href={match.path + "/subcategory"}
            >
              <Icons icon="long-arrow-alt-right" />
              Sub Category
            </Links>

            <Links
              ismenu
              classname="nav-link"
              href={match.path + "/product-category"}
            >
              <Icons icon="long-arrow-alt-right" />
              Product Category
            </Links>

            <Links ismenu classname="nav-link" href={match.path + "/product"}>
              <Icons icon="long-arrow-alt-right" />
              Products
            </Links>

            <Links ismenu classname="nav-link" href={match.path + "/cart"}>
              <Icons icon="long-arrow-alt-right" />
              Cart
            </Links>

            <Links ismenu classname="nav-link" href={match.path + "/orders"}>
              <Icons icon="long-arrow-alt-right" />
              Orders
            </Links>

            <Links ismenu classname="nav-link" href={match.path + "/size"}>
              <Icons icon="long-arrow-alt-right" />
              Size
            </Links>

            <Links ismenu classname="nav-link" href={match.path + "/color"}>
              <Icons icon="long-arrow-alt-right" />
              Color
            </Links>
            <hr />
            <Links ismenu classname="nav-link" href={match.path + "/users"}>
              <Icons icon="user" />
              Users
            </Links>

            <Links ismenu classname="nav-link" href={match.path + "/product"}>
              <Icons icon="cog" />
              Settings
            </Links>
          </ul>
        </div>
      </Scrollbars>
    </aside>
  );
};

export default withRouter(Sidebar);
