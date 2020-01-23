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
  getUserPosts: () => dispatch(getUserPosts()),
  addComment: comment => dispatch(addComment(comment)),
  likePost: postId => dispatch(likePost(postId)),
  dislikePost: postId => dispatch(dislikePost(postId))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
