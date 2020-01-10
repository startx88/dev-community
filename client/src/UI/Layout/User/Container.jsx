import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../../Main";
import { useSelector } from "react-redux";

const Container = props => {
  const { auth } = useSelector(state => state);
  return (
    <>
      <Header admin user={auth} />
      <Main classname="container">{props.children}</Main>
      <Footer />
    </>
  );
};

export default Container;
