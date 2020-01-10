import React from "react";

const Footer = ({ admin, ...res }) => {
  return admin ? (
    <footer className="footer">
      <p>
        Copyright &copy; shopkart {new Date().getFullYear()}, Powered by{" "}
        <a href="www.learnui.com" target="blank">
          Learnui.com
        </a>
      </p>
    </footer>
  ) : (
    <div className="landing-footer">
      <div className="container">
        <p>&copy;{new Date().getFullYear()} All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
