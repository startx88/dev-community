import React, { useEffect, useCallback } from "react";
import Title from "../../Widgets/Title/Title";
import Spinner from "../../UI/Spinner/Spinner";
import Section from "../../UI/Layout/Section";
import Profile from "./Controls/Profile";

const Container = props => {
  const { alert, getAllProfiles, allProfile } = props;

  const loadProfiles = useCallback(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  if (allProfile.loading) {
    return <Spinner />;
  }

  return (
    <div className="user-section">
      <Title type="page" tagline="Welcome to the depelopers page." />
      <div className="row">
        {allProfile.profiles.map(profile => (
          <div className={`col-sm-4`} key={profile._id}>
            <Profile info={profile} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Container;
