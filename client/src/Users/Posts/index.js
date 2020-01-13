import Container from "./Container";
import { connect } from "react-redux";
import {
  addPost,
  addComment,
  likePost,
  dislikePost
} from "../../Stores/Actions";
const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(addPost(data)),
  addComment: data => dispatch(addComment(data)),
  likePost: data => dispatch(likePost(data)),
  dislikePost: data => dispatch(dislikePost(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
