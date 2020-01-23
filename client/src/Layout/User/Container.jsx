import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Main from "../../UI/Main";

/*********
 * User layout container
 ********************/
const Container = props => {
  const {
    user,
    profile: { profile }
  } = props.state;

  return user.isAuth ? (
    <>
      <Header admin />
      <Main classname="container flex-1 mt-5">
        <div className="row row-user-mod">
          <div className="col-sm-3">
            <Sidebar status={profile && profile.status} />
          </div>
          <div className="col-sm-9">{props.children}</div>
        </div>
      </Main>
      <Footer admin />
    </>
  ) : (
    <>
      <Header auth={user} admin />
      <Main classname="container flex-1">{props.children}</Main>
      <Footer admin />
    </>
  );
};

export default Container;
