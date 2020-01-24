import React from "react";
import Image from "../../UI/Image";
import Date from "../../UI/Date";
import LikeButton from "../../Widgets/LikeButton/LikeButton";
import Links from "../../Widgets/Links/Links";
import { withRouter } from "react-router-dom";
import PostAction from "../../Widgets/Posts/PostAction";
import useAccess from "../../_hooks/isAuth";

// Post Component
const Post = ({ postinfo, classname, match }) => {
  const { user } = useAccess();

  return (
    <article className={classname}>
      <div className="post panel panel-white">
        {postinfo.user._id === user.user._id && (
          <PostAction postId={postinfo._id} />
        )}
        <Links classname="post-image" href={`${match.path}/` + postinfo._id}>
          <Image src={postinfo.avatar} alt={postinfo.title} />
        </Links>
        <div className="d-flex justify-content-between">
          <Date from={postinfo.insertAt} />
          <LikeButton likes={postinfo.likes} postId={postinfo._id} />
        </div>
        <h6>
          {postinfo.title}
          <small>{postinfo.users && postinfo.users.name}</small>
        </h6>
        <p>{postinfo.description.substr(0, 100)}...</p>
      </div>
    </article>
  );
};

export default withRouter(Post);
