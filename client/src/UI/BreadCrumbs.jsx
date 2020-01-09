import React from "react";

/**
 * Breadcrumbs
 *
 */

const Breadcrumbs = props => {
  const urls = props.location.url
    .split("/")
    .filter(item => item !== "")
    .filter(item => !Number(item));

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {urls.map(item => (
          <li key={item} className="breadcrumb-item active" aria-current="page">
            {item}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
