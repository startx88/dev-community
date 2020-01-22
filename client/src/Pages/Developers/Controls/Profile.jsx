import React from "react";
import Avatar from "../../../Widgets/Avatar/Avatar";
import { Link, withRouter } from "react-router-dom";

const Profile = ({ info, match }) => {
  return (
    <div className="profile">
      <Avatar
        classname="profile-image"
        href={`${match.url}/${info.user._id}`}
        avatar={info.user.avatar}
        alt={info.user.name}
      />
      <div className="profile-body">
        <h6>
          {info.user.name}
          <small>{info.status}</small>
        </h6>
        <p></p>
      </div>
      <div className="profile-footer">
        <Link to={`${match.url}/${info.user._id}`}>View Profile</Link>
      </div>
    </div>
  );
};

export default withRouter(Profile);
