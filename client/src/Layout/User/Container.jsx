import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Main from "../../UI/Main";
import { useSelector } from "react-redux";

const Container = props => {
  const {
    auth,
    profile: { profile }
  } = useSelector(state => state);
  return auth.isAuth ? (
    <>
      <Header admin />
      <Main classname="container flex-1 mt-5">
        <div className="row row-user-mod">
          <div className="col-sm-3">
            {profile && <Sidebar status={profile.status} />}
          </div>
          <div className="col-sm-9">{props.children}</div>
        </div>
      </Main>
      <Footer admin />
    </>
  ) : (
    <>
      <Header auth={auth} admin />
      <Main classname="container flex-1">{props.children}</Main>
      <Footer admin />
    </>
  );
};

export default Container;
