import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectPosts, selectAlert } from "../../Stores/Selectors";

import { addPost, getUserPosts } from "../../Stores/Actions";
const mapStateToProps = createStructuredSelector({
  posts: selectPosts,
  alert: selectAlert
});
const mapDispatchToProps = dispatch => ({
  getUserPosts: () => dispatch(getUserPosts()),
  addPost: (data, id, status) => dispatch(addPost(data, id, status))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
