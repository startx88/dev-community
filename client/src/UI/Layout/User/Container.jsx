import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../../Main";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userSelector } from "../../../Stores/Selectors";

const Container = props => {
  const { user } = useSelector(
    createStructuredSelector({
      user: userSelector
    })
  );

  return (
    <>
      <Header admin user={user} />

      {user.isAuth ? (
        <Main classname="container flex-1">
          <div className="row row-user-mod">
            <div className="col-sm-3">
              <Sidebar user={user} />
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
