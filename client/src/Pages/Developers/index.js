import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getAllProfiles,
  addComment,
  likePost,
  dislikePost,
  deletePost
} from "../../Stores/Actions";
import { selectUserProfile, selectAlert } from "../../Stores/Selectors";

/**
 * Connect with redux
 */

const mapStateToProps = createStructuredSelector({
  allProfile: selectUserProfile,
  alert: selectAlert
});

const mapDispatchToProps = dispatch => ({
  getAllProfiles: () => dispatch(getAllProfiles()),
  deletePost: postId => dispatch(deletePost(postId)),
  addComment: data => dispatch(addComment(data)),
  likePost: postId => dispatch(likePost(postId)),
  dislikePost: postId => dispatch(dislikePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
