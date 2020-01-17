import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../../Main";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userSelector } from "../../../Stores/Selectors";

const Container = props => {
  const { auth } = useSelector(state => state);

  return auth.isAuth ? (
    <>
      <Header admin />
      <Main classname="container flex-1">
        <div className="row row-user-mod">
          <div className="col-sm-3">
            <Sidebar />
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
