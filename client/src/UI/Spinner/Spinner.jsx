import React from "react";
import "./Spinner.scss";

/** Spinner */
const Spinner = ({
  svgWidthHeight = 40,
  viewBox = "0 0 40 40",
  cx = 20,
  cy = 20,
  radius = 15,
  strokWidth = 5,
  strokeDasharray = 5,
  speed = "1s",
  iteration = "infinite",
  color = "red",
  text,
  fixed
}) => {
  // circle props
  const circleProps = {
    cx: cx,
    cy: cy,
    r: radius,
    style: {
      ...{
        stroke: color,
        strokeWidth: strokWidth,
        strokeDasharray: strokeDasharray,
        animationDuration: speed,
        animationIterationCount: iteration
      }
    }
  };

  return (
    <div className={["Spinner", fixed && "fixed"].join(" ")}>
      <svg
        style={{
          width: svgWidthHeight,
          height: svgWidthHeight,
          animationDuration: speed,
          animationIterationCount: iteration
        }}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle {...circleProps} />
      </svg>
      {text && (
        <span style={{ color: color }} data-text={text}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Spinner;
