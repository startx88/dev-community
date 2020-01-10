import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Header from "../../Main";

const Container = props => {
  return (
    <>
      <Header admin />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
};

export default Container;
