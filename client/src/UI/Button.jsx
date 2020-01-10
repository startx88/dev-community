import React from "react";
import PropTypes from "prop-types";
import Icons from "./Icons";
/**
 * Buttons
 */

const Button = ({
  children,
  disabled,
  classname,
  type,
  btnType,
  clicked,
  isSubmitting,
  style,
  ...rest
}) => {
  const styles = {
    ...style,
    cursor: isSubmitting ? "none" : "pointer"
  };
  return (
    <button
      style={styles}
      disabled={isSubmitting}
      {...rest}
      type={type}
      className={["btn", btnType && "btn-" + btnType, classname].join(" ")}
      onClick={clicked}
    >
      {isSubmitting && <Icons spin icon="cog" classname="mr-2" />}
      {children}
    </button>
  );
};

// Default Props
Button.defaultProps = {
  type: "button",
  btnType: "",
  clicked: () => {},
  classname: "",
  isSubmitting: false
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  classname: PropTypes.string,
  isSubmitting: PropTypes.bool
};

export default Button;
