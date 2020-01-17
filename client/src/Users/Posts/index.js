import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userPosts } from "../../Stores/Selectors";

import { addPost, getAllPosts } from "../../Stores/Actions";
const mapStateToProps = createStructuredSelector({
  allposts: userPosts
});
const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts()),
  addPost: (data, id, status) => dispatch(addPost(data, id, status))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
