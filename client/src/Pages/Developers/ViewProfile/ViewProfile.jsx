import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Icons from "../../../UI/Icons";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfiles, getPostByUserId } from "../../../Stores/Actions";
import Spinner from "../../../UI/Spinner/Spinner";
import AlertMessage from "../../../UI/Alert";
import Skills from "../../../Widgets/User/Skills";
import Experience from "../../../Widgets/User/Experience";
import Education from "../../../Widgets/User/Education";
import PostInfo from "../../../Widgets/Posts/Posts";
import { useLocation } from "react-router-dom";

const ViewProfile = props => {
  const [tabIndex, setTabIndex] = useState({ tabIndex: 0 });
  const userId = props.match.params.id;
  const dispatch = useDispatch();
  const hash = useLocation().hash;

  const {
    profile: { profiles },
    posts: { posts },
    alert: { show, type }
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getAllProfiles());
    dispatch(getPostByUserId(userId));
    if (hash === "#info") {
      setTabIndex({ tabIndex: 1 });
    }
  }, [dispatch, userId, hash]);

  const profile = profiles.find(profile => profile.user._id === userId);

  if (!profile) {
    return <Spinner />;
  }

  return (
    <div className="view-profile">
      <div className="page-title">
        <h4>
          {profile.user.name}
          <small>{profile.status}</small>
        </h4>
      </div>
      <Tabs
        selectedIndex={tabIndex.tabIndex}
        onSelect={tabIndex => setTabIndex({ tabIndex })}
      >
        <TabList>
          <Tab id="#post">
            <Icons icon="newspaper" />
            Post
          </Tab>
          <Tab id="#info">
            <Icons icon="info-circle" />
            Info
          </Tab>
          <Tab>
            <Icons icon="images" />
            Portfolio
          </Tab>
        </TabList>
        <TabPanel>
          <div className="row">
            <div className="col-sm-8">
              <AlertMessage type={type} show={show} />
              {posts &&
                posts.map(post => (
                  <PostInfo
                    key={post._id}
                    status={profile.status}
                    postinfo={post}
                  />
                ))}
            </div>
          </div>
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
