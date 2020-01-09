import React, { useState } from "react";
import { ChromePicker, SketchPicker } from "react-color";
import Button from "../../ui/Button";

/** Color Picker */
const ColorPicker = ({ label, name, value, changed, classname }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "1"
  });

  // Handle Click
  const handleClick = () => {
    setShowPicker(!showPicker);
  };

  const handleClose = () => {
    setShowPicker(false);
  };

  const handleChange = event => {
    setColor(event.rgb);
    changed(name, event.hex);
  };

  const popover = {
    position: "absolute",
    zIndex: "2"
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
  };

  return (
    <div className={["color-picker", classname].join(" ")}>
      <Button
        style={{
          borderRadius: "5px",
          backgroundColor: value
            ? value
            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          color: "white",
          border: "1px solid #000"
        }}
        clicked={handleClick}
        btnType="light"
        classname="btn-block"
      >
        Pick Color
      </Button>
      {showPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <ChromePicker
            color={value ? value : color}
            name={name}
            onChangeComplete={handleChange}
            label={label}
            defaultValue={value}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
