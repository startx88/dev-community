import React from "react";
import AlertMessage from "../../UI/Alert";
import Icons from "../../UI/Icons";
import { useSelector } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import Date from "../../UI/Date";
const Profile = props => {
  const {
    alert: { show, type },
    profile: { profile: info }
  } = useSelector(state => state);
  console.log(info);
  if (!info) {
    return <Spinner />;
  }
  return (
    <>
      <AlertMessage show={show} type={type} />
      <div className="personal-info">
        <div className="row">
          <div className="col-sm-12 mb-3">
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
            {info.education.map(edu => (
              <div class="edu-info">
                <Date from={edu.from} to={edu.to} />
                <h6>
                  Ignou
                  <small>Delhi</small>
                </h6>
                <span>Computer science</span>
                <p>
                  Master of Science in Information and Communications Technology
                  with a concentration in Web Design and Development{" "}
                </p>
              </div>
            ))}
          </div>
          <div className="col-sm-6">
            <h6>
              <Icons icon="briefcase" /> Experience
            </h6>
            {info.experience.map(edu => (
              <div class="edu-info">
                <div className="date">
                  <time>12-05-2019</time> - <time>12-05-2019</time>
                </div>
                <h6>
                  Ignou
                  <small>Delhi</small>
                </h6>
                <span>Computer science</span>
                <p>
                  Master of Science in Information and Communications Technology
                  with a concentration in Web Design and Development{" "}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
