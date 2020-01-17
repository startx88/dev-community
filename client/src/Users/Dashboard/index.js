import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userPosts } from "../../Stores/Selectors";

import { getAllPosts } from "../../Stores/Actions";
const mapStateToProps = createStructuredSelector({
  allposts: userPosts
});
const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts())
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
