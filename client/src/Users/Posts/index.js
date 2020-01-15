import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userPosts } from "../../Stores/Selectors";

import { addPost, fetchUserPosts } from "../../Stores/Actions";
const mapStateToProps = createStructuredSelector({
  postData: userPosts
});
const mapDispatchToProps = dispatch => ({
  fetchUserPosts: () => dispatch(fetchUserPosts()),
  addPost: (data, id, status) => dispatch(addPost(data, id, status))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
