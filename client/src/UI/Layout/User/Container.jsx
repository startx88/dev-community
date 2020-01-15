import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../../Main";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";

const Container = props => {
  const { auth } = useSelector(state => state);
  return (
    <>
      <Header admin user={auth} />

      {auth.isAuth ? (
        <Main classname="container flex-1">
          <div className="row row-user-mod">
            <div className="col-sm-3">
              <Sidebar user={auth} />
            </div>
            <div className="col-sm-9">{props.children}</div>
          </div>
        </Main>
      ) : (
        <Main classname="container flex-1 mt-4">{props.children}</Main>
      )}

      <Footer admin />
    </>
  );
};

export default Container;
