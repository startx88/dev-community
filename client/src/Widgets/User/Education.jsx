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
        {edu.degree} ({edu.fieldofstudy})<small>School: {edu.school}</small>
      </h6>
      <span></span>
      <p>{edu.description}</p>
    </div>
  ));
};

export default Education;
