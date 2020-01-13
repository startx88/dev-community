import React from "react";
import Date from "../../../UI/Date";
import Button from "../../../UI/Button";
import Icons from "../../../UI/Icons";

const ExperienceShow = ({ experience, deleted }) => {
  return experience.map(exp => (
    <div className="edu-info" key={exp._id}>
      <Button clicked={() => deleted(exp._id)} classname="btn-dlt-icon">
        <Icons icon="trash-alt" />
      </Button>
      <Date from={exp.from} to={exp.to} />
      <h6>
        {exp.title} {exp.current && "( Working )"} <small>{exp.location}</small>
      </h6>
      <span>{exp.company}</span>
      <p>{exp.description}</p>
    </div>
  ));
};

export default ExperienceShow;
