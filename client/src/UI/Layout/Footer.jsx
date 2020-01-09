import React from "react";

const Footer = props => {
  return (
    <footer className="footer">
      <p>
        Copyright &copy; shopkart {new Date().getFullYear()}, Powered by{" "}
        <a href="www.learnui.com" target="blank">
          Learnui.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
