import Container from "./Container";
import { connect } from "react-redux";
import { likePost, dislikePost, deletePost } from "../../../Stores/Actions";

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId)),
  likePost: postId => dispatch(likePost(postId)),
  dislikePost: postId => dispatch(dislikePost(postId))
});
export default connect(null, mapDispatchToProps)(Container);
