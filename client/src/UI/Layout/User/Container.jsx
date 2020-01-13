import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../../Main";
import Sidebar from '../Sidebar'
import { useSelector } from "react-redux";

const Container = props => {
  const { auth } = useSelector(state => state);
  return (
    <>
      <Header admin user={auth} />
      <Main classname="container">
        <div className="row">
          <div className="col-sm-3">
            <Sidebar user={auth}/>
          </div>
          <div className="col-sm-9">
            {props.children}
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default Container;
