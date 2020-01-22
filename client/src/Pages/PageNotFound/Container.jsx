import React from "react";
import { Link } from "react-router-dom";
const Container = props => {
  return (
    <div className="landing-content">
      <div className="landing-body">
        <div className="page-not-found">
          <h1>Page Not found</h1>
          <Link className="btn mt-3 btn-primary" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Container;
