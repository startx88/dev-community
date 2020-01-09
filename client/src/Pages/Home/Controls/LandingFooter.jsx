import React from "react";

const LandingFooter = props => {
  return (
    <div className="landing-footer">
      <div className="container">
        <p>&copy;{new Date().getFullYear()} All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingFooter;
