import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Main from "../Main";
import { useSelector } from "react-redux";
/// Main Layout
const Container = props => {
  const { auth } = useSelector(state => state);
  return (
    <div className="wrapper">
      <Header user={auth} />
      <Sidebar user={auth} />
      <div className="content-wrapper d-flex flex-column">
        <Main>{props.children}</Main>
        <Footer />
      </div>
    </div>
  );
};

export default Container;
