import React from "react";
import Title from "../../Widgets/Title/Title";
import Spinner from "../../UI/Spinner/Spinner";
import PrivateRoute from "../../Web/PrivateRoute";
import Profile from "./Profile";
import EducationForm from "./Forms/EducationForm";
import ExperienceForm from "./Forms/ExperienceForm";
import ProfileForm from "./Forms/ProfileForm";
import { Link, Redirect } from "react-router-dom";

const Container = props => {
  const { match } = props;
  const { profile, loading } = props.profile;

  if (loading) {
    return <Spinner />;
  }

  return profile === null ? (
    <div className="no-post" />
  ) : (
    <>
      <Title type="admin">
        <div>
          {!profile && (
            <Link
              to={match.url + "/add-profile"}
              className="btn btn-info btn-sm"
            >
              Add Profile
            </Link>
          )}

          <Link
            to={match.url + "/add-experience"}
            className="btn btn-info ml-2 mr-2 btn-sm"
          >
            Add Experience
          </Link>
          <Link
            to={match.url + "/add-education"}
            className="btn btn-info btn-sm"
          >
            Add Education
          </Link>
        </div>
      </Title>
      <hr />
      <PrivateRoute
        path={match.url}
        exact
        component={childProps => (
          <Profile parentProps={props} {...childProps} />
        )}
      />

      {!profile ? (
        <PrivateRoute
          path={match.url + "/add-profile"}
          component={childProps => (
            <ProfileForm parentProps={props} {...childProps} />
          )}
        />
      ) : (
        <Redirect to="/users/profiles" />
      )}

      <PrivateRoute
        path={match.url + "/add-education"}
        component={childProps => (
          <EducationForm parentProps={props} {...childProps} />
        )}
      />
      <PrivateRoute
        path={match.url + "/add-experience"}
        component={childProps => (
          <ExperienceForm parentProps={props} {...childProps} />
        )}
      />
    </>
  );
};
export default Container;
