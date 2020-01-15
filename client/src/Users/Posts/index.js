import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userPosts } from "../../Stores/Selectors";

import {
  addPost,
  addComment,
  likePost,
  dislikePost,
  fetchUserPosts,
  deletePost
} from "../../Stores/Actions";
const mapStateToProps = createStructuredSelector({
  postData: userPosts
});
const mapDispatchToProps = dispatch => ({
  fetchUserPosts: () => dispatch(fetchUserPosts()),
  deletePost: postId => dispatch(deletePost(postId)),
  addPost: (data, id, status) => dispatch(addPost(data, id, status)),
  addComment: data => dispatch(addComment(data)),
  likePost: postId => dispatch(likePost(postId)),
  dislikePost: postId => dispatch(dislikePost(postId))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
