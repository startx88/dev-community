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
  isClearable,
  onBlur,
  errors,
  touched,
  transformDataAs,
  ...rest
}) => {
  // Change Handler
  const changeHandler = event => {
    setFieldValue(name, event);
  };

  const customeDataHandler = debounce(event => {
    const newArray = transformDataAs(event);
    setFieldValue(name, newArray);
  }, 2000);

  const handleBlur = e => {
    onBlur(name, true);
  };

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
          id={name}
          name={name}
          options={options}
          getOptionLabel={option => renderProps(option)}
          getOptionValue={option => option.id}
          onChange={changeHandler}
          onBlur={handleBlur}
          value={value}
        />
      )}
      <div className="invalid-feedback">{errors}</div>
    </div>
  );
};

CustomSelect.defaultProps = {
  name: "select",
  label: "Select Options",
  value: "",
  renderProps: () => {},
  setFieldValue: () => {},
  transformDataAs: () => {}
};

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  renderProps: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  transformDataAs: PropTypes.func
};

export default CustomSelect;
