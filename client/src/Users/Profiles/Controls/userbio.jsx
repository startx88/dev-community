import React from "react";
import Icons from "../../../UI/Icons";
const UserBio = ({ name, bio, status }) => {
  return (
    <>
      <h6>
        <Icons icon="user" />
        {name} ({status})
      </h6>
      <p>{bio}</p>
    </>
  );
};

export default UserBio;
