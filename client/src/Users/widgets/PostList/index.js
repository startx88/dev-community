import Container from "./Container";
import { connect } from "react-redux";
import {
  addPost,
  addComment,
  likePost,
  dislikePost,
  deletePost
} from "../../../Stores/Actions";

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId)),
  addPost: (data, id, status) => dispatch(addPost(data, id, status)),
  addComment: data => dispatch(addComment(data)),
  likePost: postId => dispatch(likePost(postId)),
  dislikePost: postId => dispatch(dislikePost(postId))
});
export default connect(null, mapDispatchToProps)(Container);
