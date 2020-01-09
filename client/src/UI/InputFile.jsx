import React, { useRef } from "react";

import Image from "./Image";

/**
 *
 * Input file component
 */
const InputFile = ({
  label,
  name,
  type,
  value,
  setFieldValue,
  errors,
  classname,
  parentclass
}) => {
  const filePreviewRef = useRef(null); // input ref

  /** File Preview */
  const imageChangeHandler = event => {
    const files = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      filePreviewRef.current.src = reader.result;
      filePreviewRef.current.parentNode.classList.add("d-inline");
    };
    reader.readAsDataURL(files);
    setFieldValue(name, files);
  };

  return (
    <div className={["form-group", parentclass].join(" ")}>
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        onChange={imageChangeHandler}
        className="form-control"
      />
      <div className="preview">
        {value && <Image src={value} alt={label} />}
        <Image refs={filePreviewRef} classname="d-none" />
      </div>
      {errors && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );
};

export default InputFile;
