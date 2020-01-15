import Container from "./Container";
import { connect } from "react-redux";
import { addComment, deleteComment } from "../../Stores/Actions";

// Redux Connecter
const mapStateToProps = state => ({ posts: state.posts });
const mapDispatchToProps = dispatch => ({
  addComment: comment => dispatch(addComment(comment)),
  deleteComment: (postId, commentId) =>
    dispatch(deleteComment(postId, commentId))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
