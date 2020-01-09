import React from "react";
import PropTypes from "prop-types";
import Icons from "./Icons";

/**
 * Custom Input
 */

const Input = ({
  inputtype,
  label,
  type,
  name,
  value,
  setFieldValue,
  errors,
  parentclass,
  classname,
  placeholder,
  touched,
  blur,
  icon
}) => {
  let element = null;

  // Handle Change
  const changeHandler = e => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };
  switch (inputtype) {
    case "input":
      element = (
        <input
          type={type}
          name={name}
          value={value}
          onBlur={blur}
          onChange={changeHandler}
          placeholder={placeholder}
          className={[
            "form-control",
            touched[name] && errors[name] && "is-invalid",
            touched[name] && !errors[name] && "is-valid",
            classname
          ].join(" ")}
        />
      );
      break;

    case "textarea":
      element = (
        <textarea
          value={value}
          name={name}
          onBlur={blur}
          onChange={changeHandler}
          placeholder={placeholder}
          className={[
            "form-control",
            touched[name] && errors[name] && "is-invalid",
            touched[name] && !errors[name] && "is-valid",
            classname
          ].join(" ")}
        ></textarea>
      );
      break;
    default:
      throw new Error("no input type");
  }
  return (
    <div className={["form-group", icon && "icon", parentclass].join(" ")}>
      {icon && <Icons classname="_icon" icon={icon} />}
      {label && <label>{label}</label>}
      {element}
      {errors && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );
};

Input.defaultProps = {
  inputtype: "input",
  type: "text",
  name: "",
  value: "",
  classname: "",
  errors: {},
  touched: {}
};

Input.propTypes = {
  inputtype: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  classname: PropTypes.string
};
export default Input;
