import Container from "./Container";
import { getAllPosts, showAlert } from "../../Stores/Actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllPost, selectAlert } from "../../Stores/Selectors";

// state
const mapStateToProps = createStructuredSelector({
  posts: selectAllPost,
  alert: selectAlert
});
// dispatch
const mapDispatchToProps = dispatch => ({
  getAlert: () => dispatch(showAlert()),
  getAllPosts: () => dispatch(getAllPosts())
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
