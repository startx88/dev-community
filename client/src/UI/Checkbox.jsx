import React, { useState } from "react";

/**
 *
 * Input Radio Checkbox
 */
const InputCheckbox = ({
  id,
  type,
  label,
  name,
  value,
  setFieldValue,
  top,
  parentclass,
  left
}) => {
  const changeHandler = event => {
    const { name, value, checked } = event.target;
    const item = event.target.name;
    setFieldValue(name, value);
    // const isChecked = e.target.checked;
    // setState(prevState => ({
    //   checkedItems: prevState.checkedItems.set(item, isChecked)
    // }));
  };

  return (
    <div
      className={["from-group", parentclass].join(" ")}
    >
      {top && <small className="_top">{label}</small>}
      <label htmlFor={id} className={["_checkbox"].join(" ")}>
        <input
          type={type}
          name={name}
          id={id}
          onChange={changeHandler}
          value={label}
          defaultChecked={value}
        />
        <span />
      </label>
      {!top && <small>{label}</small>}
    </div>
  );
};

export default InputCheckbox;
