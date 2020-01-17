import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllPost } from "../../Stores/Selectors";

import { getAllPosts } from "../../Stores/Actions";
const mapStateToProps = createStructuredSelector({
  allposts: selectAllPost
});
const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts())
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
