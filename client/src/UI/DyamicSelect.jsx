import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

// Select Component
const CustomSelect = ({
  name,
  label,
  value,
  options,
  renderProps,
  setFieldValue,
  classname,
  method,
  isClearable,
  ...rest
}) => {
  // Change Handler
  const changeHandler = event => {
    setFieldValue(name, event);
  };

  const customeDataHandler = debounce(event => {
    const newArray = event.map(size => size.value);
    //console.log(newArray);
    //setFieldValue(name, newArray);
  }, 2000);

  return (
    <div className={["form-group", classname].join(" ")}>
      <label>{label}</label>
      {isClearable ? (
        <CreatableSelect
          {...rest}
          placeholder="Type sizes press enter or tab."
          onChange={customeDataHandler}
        />
      ) : (
        <Select
          {...rest}
          name={name}
          options={options}
          getOptionLabel={option => renderProps(option)}
          getOptionValue={option => option._id}
          onChange={changeHandler}
        />
      )}
    </div>
  );
};

CustomSelect.defaultProps = {
  name: "select",
  label: "Select Options",
  value: "",
  renderProps: () => {},
  setFieldValue: () => {},
  method: () => {}
};

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  renderProps: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  method: PropTypes.func
};

export default CustomSelect;
