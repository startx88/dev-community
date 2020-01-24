import Container from "./Container";
import { connect } from "react-redux";
import {
  addComment,
  deleteComment,
  getPost,
  likePost,
  dislikePost,
  getUserPosts
} from "../../../Stores/Actions";
import { createStructuredSelector } from "reselect";
import { selectPost } from "../../../Stores/Selectors";

// Redux Connecter
const mapStateToProps = createStructuredSelector({ postinfo: selectPost });

const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch(getPost(postId)),
  getUserPosts: () => dispatch(getUserPosts())
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
