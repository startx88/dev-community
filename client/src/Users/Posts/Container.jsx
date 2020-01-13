import React, { lazy } from "react";
import Title from "../../Widgets/Title/Title";
import { Link } from "react-router-dom";
import PrivateRoute from "../../Web/PrivateRoute";
const EditPost = lazy(() => import("./EditPost"));

const Container = props => {
  const { match } = props;

  return (
    <>
      <Title type="admin">
        <Link to={match.url + "/add-post"} className="btn btn-info btn-sm">
          Add Post
        </Link>
      </Title>
      <hr />
      <PrivateRoute
        path={match.url + "/add-post"}
        component={childProps => (
          <EditPost parentProp={props} {...childProps} />
        )}
      />
    </>
  );
};
export default Container;
