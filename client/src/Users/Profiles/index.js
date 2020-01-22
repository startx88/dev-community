import Container from "./Container";
import { connect } from "react-redux";
import { selectAlert, selectUserProfile } from "../../Stores/Selectors";
import { createStructuredSelector } from "reselect";

import {
  addProfile,
  addEducation,
  deleteEducation,
  addExperience,
  deleteExperience
} from "../../Stores/Actions";

const mapStateToProps = createStructuredSelector({
  profile: selectUserProfile,
  alert: selectAlert
});

const mapDispatchToProps = dispatch => ({
  addProfile: postData => dispatch(addProfile(postData)),
  addExperience: postData => dispatch(addExperience(postData)),
  deleteExperience: id => dispatch(deleteExperience(id)),
  addEducation: postData => dispatch(addEducation(postData)),
  deleteEducation: id => dispatch(deleteEducation(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
