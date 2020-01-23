import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../../UI/Main";

const Container = props => {
  return (
    <div className="landing">
      <Header />
      <Main classname="container">{props.children}</Main>
      <Footer />
    </div>
  );
};

export default Container;
