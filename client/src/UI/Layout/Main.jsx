import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

/// Main Layout
const Main = props => {
  return (
    <>
      <Header />
      <Sidebar />
      <div class="content"></div>
      <Footer />
    </>
  );
};

export default Main;
