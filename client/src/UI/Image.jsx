import React from "react";

/**
 * Image component
 */
const Image = ({ src, alt, classname, refs }) => {
  return classname ? (
    <div className={classname}>
      <img ref={refs} src={src} alt={alt} />
    </div>
  ) : (
    <img ref={refs} src={src} alt={alt} />
  );
};

export default Image;
