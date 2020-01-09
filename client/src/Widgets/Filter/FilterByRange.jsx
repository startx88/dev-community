import React from "react";

const Sorting = ({ sortHandler }) => {
  /** Change Handler */
  const changeHandler = event => {
    const { value } = event.target;
    sortHandler(value);
  };
  return (
    <div className="sorting">
      <label>Show: </label>
      <select onChange={changeHandler} className="form-control">
        {[1, 2, 3, 4].map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
