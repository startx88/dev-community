import React from "react";

const Skills = ({ skills, color }) => {
  return (
    <ul className="skills row">
      {skills.map(skill => (
        <li key={skill} className="col-sm-6">
          <div className="d-flex justify-content-between">
            <label>{skill}</label>
            <span>100%</span>
          </div>
          <div className="progress">
            <div
              style={{ backgroundColor: color ? color : "sky" }}
              className="progress-bar w-100"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Skills;
