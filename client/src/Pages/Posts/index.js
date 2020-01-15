import Container from "./Container";
import { getAllPosts } from "../../Stores/Actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllPost } from "../../Stores/Selectors";

// state
const mapStateToProps = createStructuredSelector({ posts: selectAllPost });
// dispatch
const mapDispatchToProps = dispatch => ({
  getAllPost: () => dispatch(getAllPosts())
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
