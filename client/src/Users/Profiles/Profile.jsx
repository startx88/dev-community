import React, { useState, useEffect } from "react";
import AlertMessage from "../../UI/Alert";
import Icons from "../../UI/Icons";
import { useSelector } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import Date from "../../UI/Date";
import Button from "../../UI/Button";
import EducationShow from "./Controls/EducationShow";
import ExperienceShow from "./Controls/ExperienceShow";
import { Link } from "react-router-dom";
// Profiles
const Profile = props => {
  const { parentProp } = props;

  const {
    alert: { show, type },
    profile: { profile: info }
  } = parentProp;

  // delete education
  const educationDeleteHandler = id => {
    parentProp.deleteEducation(id);
  };

  // delete education
  const experienceDeleteHandler = id => {
    parentProp.deleteExperience(id);
  };
  const editProfile = () => {
    props.history.push({
      pathname: `${props.location.pathname}/profile`,
      search: `?edit=${true}`
    });
  };

  if (!info) {
    return <Spinner />;
  }

  return (
    <>
      <AlertMessage show={show} type={type} />
      <div className="personal-info">
        <div className="row">
          <div className="col-sm-12 mb-3 ">
            <Button clicked={editProfile} classname="btn btn-edit-icon">
              <Icons icon="edit" />
            </Button>
            <h6>
              <Icons icon="user" /> About Me
            </h6>
            <p>{info.bio}</p>
          </div>
          <div className="col-sm-12 mb-3">
            <h6>
              <Icons icon="tachometer-alt" /> Skills
            </h6>
            <ul className="skills-list row">
              {info.skills.map(skill => (
                <li key={skill} className="col-sm-6">
                  <div className="d-flex justify-content-between">
                    <h6>{skill}</h6>
                    <span>100%</span>
                  </div>
                  <div className="progress">
                    <div
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
          </div>
          <div className="col-sm-6">
            <h6>
              <Icons icon="book-reader" /> Education
            </h6>
            <EducationShow
              education={info.education}
              deleted={educationDeleteHandler}
            />
          </div>
          <div className="col-sm-6">
            <h6>
              <Icons icon="briefcase" /> Experience
            </h6>
            <ExperienceShow
              experience={info.experience}
              deleted={experienceDeleteHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
