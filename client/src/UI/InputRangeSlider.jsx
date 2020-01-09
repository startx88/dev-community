import React from "react";

/**
 * Range Slider
 */

const RangeSlider = ({ inputLabel, value, getRangeValue }) => {
  const changedHandler = e => {
    getRangeValue(e.target.value);
  };

  return (
    <div className="range-slider">
      {inputLabel && <label>{inputLabel}</label>}
      <input
        onChange={changedHandler}
        type="range"
        defaultValue={value}
        min="100"
        max="50000"
      />
    </div>
  );
};

export default RangeSlider;
