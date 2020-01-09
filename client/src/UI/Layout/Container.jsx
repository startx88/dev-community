import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Main from "../Main";
/// Main Layout
const Container = props => {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper d-flex flex-column">
        <Main>{props.children}</Main>
        <Footer />
      </div>
    </div>
  );
};

export default Container;
