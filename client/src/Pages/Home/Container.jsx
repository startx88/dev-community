import React from "react";

import { Link } from "react-router-dom";

const Container = props => {
  return (
    <div className="landing-content">
      <div className="landing-body">
        <h1>Developer Connecter</h1>
        <p>
          Spaces is one of the most advanced Co-working Listing Web Templates we
          ever created. It is built on the popular Bootstrap 4 CSS Framework and
          includes beautiful and practical pages to best showcase co-working
          spaces for awesome workers.{" "}
        </p>
        <div className="landing-btn-action">
          <Link to="/login" className="btn btn-info mr-2 btn-auth">
            Login
          </Link>
          <Link to="/register" className="btn btn-info ml-2 btn-auth">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Container;
