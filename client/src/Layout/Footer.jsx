import React from "react";

const Footer = ({ admin }) => {
  return (
    <footer
      className={["footer", admin ? "footer-user" : "footer-publi"].join(" ")}
    >
      <div className="container text-center">
        <p>
          &copy; - {new Date().getFullYear()}, Dev-Community, Powered by{" "}
          <a href="//www.learnui.com" target="blank">
            Learnui.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
