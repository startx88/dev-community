import React from "react";
import Date from "../../UI/Date";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";

/**
 * Experience component
 * @param {*} param0
 */
const Experience = ({ experience, deleted }) => {
  return experience.map(exp => (
    <div className="user-exp-edu" key={exp._id}>
      <Button clicked={() => deleted(exp._id)} classname="btn-dlt-icon">
        <Icons icon="trash-alt" />
      </Button>
      <Date from={exp.from} to={exp.to} />
      <h6>
        {exp.title} {exp.current && "( Working )"}
      </h6>
      <span>
        {exp.company} ( {exp.location} )
      </span>
      <p>{exp.description}</p>
    </div>
  ));
};

export default Experience;
