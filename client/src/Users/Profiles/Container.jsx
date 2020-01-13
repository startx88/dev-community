import React from "react";
import Title from "../../Widgets/Title/Title";
import { useSelector } from "react-redux";
import PrivateRoute from "../../Web/PrivateRoute";
import Profile from "./Profile";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProfileForm from "./ProfileForm";
import { Link } from "react-router-dom";

const Container = props => {
  const { match } = props;
  const { profile } = useSelector(state => state.profile);
  console.log("profile", props);
  return (
    <>
      <Title type="admin">
        <div>
          <Link to={match.url + "/profile"} className="btn btn-info btn-sm">
            Add Profile
          </Link>
          <Link
            to={match.url + "/experience"}
            className="btn btn-info ml-2 mr-2 btn-sm"
          >
            Add Experience
          </Link>
          <Link to={match.url + "/education"} className="btn btn-info btn-sm">
            Add Education
          </Link>
        </div>
      </Title>
      <hr />
      <PrivateRoute
        path={match.url}
        exact
        component={childProps => <Profile parentProp={props} {...childProps} />}
      />

      <PrivateRoute
        path={match.url + "/profile"}
        component={childProps => (
          <ProfileForm parentProp={props} {...childProps} />
        )}
      />
      <PrivateRoute
        path={match.url + "/education"}
        component={childProps => (
          <EducationForm parentProp={props} {...childProps} />
        )}
      />
      <PrivateRoute
        path={match.url + "/experience"}
        component={childProps => (
          <ExperienceForm parentProp={props} {...childProps} />
        )}
      />
    </>
  );
};
export default Container;
