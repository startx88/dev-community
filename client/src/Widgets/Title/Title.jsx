import React from "react";
import BreadCrumbs from "../../UI/BreadCrumbs";
import { withRouter } from "react-router-dom";

/** Title */
const Title = ({
  admin,
  type,
  tagline,
  title,
  children,
  classname,
  match,
  breadcrumb,
  ...rest
}) => {
  const urls = match.path.split("/").filter(item => item !== "");
  let element = null;
  let titles = urls[urls.length - 1];

  switch (type) {
    case "admin":
      element = (
        <div className={["admin-page-title", classname].join(" ")}>
          <h4>
            {urls.length > 1 ? titles : urls[0]}
            {tagline && <small>{tagline}</small>}
          </h4>
          {breadcrumb && <BreadCrumbs location={match} />}
          {children}
        </div>
      );
      break;
    case "page":
      element = (
        <div className={["page-title", classname].join(" ")}>
          <div className="container">
            <h4>
              {urls.length > 1 ? urls[1] : urls}
              {tagline && <small>{tagline}</small>}
            </h4>
            {breadcrumb && <BreadCrumbs location={match} />}
            {children}
          </div>
        </div>
      );
      break;
    default:
      element = (
        <div className={["title", classname].join(" ")}>
          <h4>{urls}</h4>
          {children}
        </div>
      );
  }

  return element;
};

export default withRouter(Title);
