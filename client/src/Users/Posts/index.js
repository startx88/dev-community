import Container from "./Container";
import { connect } from "react-redux";
import {
  addPost,
  addComment,
  likePost,
  dislikePost,
  fetchUserPosts,
  deletePost
} from "../../Stores/Actions";
const mapStateToProps = state => ({
  userPost: state.posts,
  alert: state.alert
});
const mapDispatchToProps = dispatch => ({
  fetchUserPosts: () => dispatch(fetchUserPosts()),
  deletePost: postId => dispatch(deletePost(postId)),
  addPost: (data, id, status) => dispatch(addPost(data, id, status)),
  addComment: data => dispatch(addComment(data)),
  likePost: data => dispatch(likePost(data)),
  dislikePost: data => dispatch(dislikePost(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
