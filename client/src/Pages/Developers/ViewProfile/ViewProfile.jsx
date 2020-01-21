import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Icons from "../../../UI/Icons";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfiles } from "../../../Stores/Actions";
import Spinner from "../../../UI/Spinner/Spinner";
import Skills from "../../../Users/Profiles/Controls/Skills";
import Experience from "../../../Widgets/User/Experience";
import Education from "../../../Widgets/User/Education";

const ViewProfile = props => {
  const profileId = props.match.params.id;
  const dispatch = useDispatch();
  const { profiles } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, []);

  const profile = profiles.find(profile => profile._id === profileId);

  if (!profile) {
    return <Spinner />;
  }
  console.log(profile);

  return (
    <div className="view-profile">
      <div className="page-title">
        <h4>
          Pradeep Kumar
          <small>Graphic Designer at Self Employed</small>
        </h4>
      </div>
      <Tabs>
        <TabList>
          <Tab>
            <Icons icon="newspaper" />
            Post
          </Tab>
          <Tab>
            <Icons icon="info-circle" />
            Info
          </Tab>
          <Tab>
            <Icons icon="images" />
            Portfolio
          </Tab>
        </TabList>
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <div className="panel panel-white">
            <h6>Overview</h6>
            <p>{profile.bio}</p>
          </div>
          <div className="panel panel-white">
            <h6>Skills</h6>
            <Skills skills={profile.skills} />
          </div>
          <div className="panel panel-white">
            <h6>Experience</h6>
            <Experience experience={profile.experience} />
          </div>
          <div className="panel panel-white">
            <h6>education</h6>
            <Education education={profile.education} />
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ViewProfile;
