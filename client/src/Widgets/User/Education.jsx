import React from "react";
import Date from "../../UI/Date";
import Button from "../../UI/Button";
import Icons from "../../UI/Icons";

const Education = ({ education, deleted }) => {
  return education.map(edu => (
    <div className="user-exp-edu" key={edu._id}>
      <Button clicked={() => deleted(edu._id)} classname="btn-dlt-icon">
        <Icons icon="trash-alt" />
      </Button>
      <Date from={edu.from} to={edu.to} />
      <h6>
        {edu.school}
        <small>{edu.location}</small>
      </h6>
      <span>{edu.fieldofstudy}</span>
      <p>{edu.description}</p>
    </div>
  ));
};

export default Education;
