import React from "react";
import Image from "../../../UI/Image";
import Icons from "../../../UI/Icons";
import Date from "../../../UI/Date";
import Button from "../../../UI/Button";
import LikeButton from "../../../Widgets/LikeButton/LikeButton";
import { Link, withRouter } from "react-router-dom";

// Post Component
const Post = ({
  isAuth,
  postinfo,
  deletePost,
  editedPost,
  likeHandler,
  dislikeHandler,
  likes,
  classname,
  ...rest
}) => {
  const { match } = rest;
  return (
    <article className={["post", classname].join(" ")}>
      {isAuth.isAuth && isAuth.user._id === postinfo.user._id && (
        <div className="post-btn">
          <Button
            type="button"
            clicked={() => editedPost(postinfo._id)}
            btnType="edit-icon"
          >
            <Icons icon="pencil-alt" />
          </Button>
          <Button
            type="button"
            clicked={() => deletePost(postinfo._id)}
            btnType="dlt-icon"
          >
            <Icons icon="trash-alt" />
          </Button>
        </div>
      )}

      <Link to={`${match.path}/` + postinfo._id}>
        <Image src={postinfo.avatar} alt={postinfo.title} />
      </Link>

      <div className="d-flex justify-content-between">
        <Date from={postinfo.insertAt} />
        <LikeButton
          likes={likes}
          likeHandler={() => likeHandler(postinfo._id)}
          dislikeHandler={() => dislikeHandler(postinfo._id)}
        />
      </div>
      <h6>
        {postinfo.title}
        <small>{postinfo.users && postinfo.users.name}</small>
      </h6>
      <p>{postinfo.description.substr(0, 100)}...</p>
    </article>
  );
};

export default withRouter(Post);
