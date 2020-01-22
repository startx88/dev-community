import Container from "./Container";
import { connect } from "react-redux";
import { addComment, deleteComment, getPost } from "../../../Stores/Actions";
import { createStructuredSelector } from "reselect";
import { selectPost } from "../../../Stores/Selectors";

// Redux Connecter
const mapStateToProps = createStructuredSelector({ postinfo: selectPost });

const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch(getPost(postId)),
  addComment: comment => dispatch(addComment(comment)),
  deleteComment: (postId, commentId) =>
    dispatch(deleteComment(postId, commentId))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
