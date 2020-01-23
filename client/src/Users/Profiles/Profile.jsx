import React from "react";
import AlertMessage from "../../UI/Alert";
import Icons from "../../UI/Icons";
import Spinner from "../../UI/Spinner/Spinner";
import Button from "../../UI/Button";
import Education from "../../Widgets/User/Education";
import Experience from "../../Widgets/User/Experience";
import Skills from "../../Widgets/User/Skills";
import UserBio from "./Controls/userbio";

// Profiles
const Profile = props => {
  const { parentProps } = props;
  const {
    alert: { show, type },
    profile,
    deleteEducation,
    deleteExperience
  } = parentProps;

  // DELETE EDUCATION HANDLER
  const educationDeleteHandler = id => {
    deleteEducation(id);
  };

  // DELETE EXPERIENCE HANDLER
  const experienceDeleteHandler = id => {
    deleteExperience(id);
  };

  // EDIT PROFILE HANDLER
  const editProfile = () => {
    props.history.push({
      pathname: `${props.location.pathname}/add-profile`,
      search: `?edit=${true}`
    });
  };

  if (profile.loading) {
    return <Spinner />;
  }

  if (!profile.profile) {
    return <div className="no-post" />;
  }

  const profileUser = profile.profile.user;

  return (
    <>
      <AlertMessage show={show} type={type} />
      <div className="personal-info">
        <div className="row">
          {/* User Info */}
          <div className="col-sm-12 mb-3 ">
            {!profile.profile && (
              <Button clicked={editProfile} classname="btn btn-edit-icon">
                <Icons icon="edit" />
              </Button>
            )}
            <UserBio
              name={profileUser.name}
              bio={profile.profile.bio}
              status={profile.profile.status}
            />
          </div>
          <div className="col-sm-12 mb-3">
            <h6>
              <Icons icon="tachometer-alt" /> Skills
            </h6>
            <Skills skills={profile.profile.skills} />
          </div>

          <div className="col-sm-6">
            <h6>
              <Icons icon="book-reader" /> Education
            </h6>
            <Education
              education={profile.profile.education}
              deleted={educationDeleteHandler}
            />
          </div>
          <div className="col-sm-6">
            <h6>
              <Icons icon="briefcase" /> Experience
            </h6>
            <Experience
              experience={profile.profile.experience}
              deleted={experienceDeleteHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
