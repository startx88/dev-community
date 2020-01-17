import React from "react";

/**
 * Image component
 */
const Image = ({ src, alt, classname, width, thumb, refs }) => {
  return (
    <div className={classname}>
      <img ref={refs} width={width} src={src} alt={alt} />
    </div>
  );
};

export default Image;
