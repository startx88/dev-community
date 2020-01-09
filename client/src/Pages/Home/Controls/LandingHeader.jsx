import React from "react";
import Logo from "../../../Widgets/Logo/Logo";
const LandingHeader = props => {
  return (
    <div className="landing-header">
      <div className="container">
        <Logo href="/" brandname="DC" />
      </div>
    </div>
  );
};

export default LandingHeader;
