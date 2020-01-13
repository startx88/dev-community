import Container from "./Container";
import { connect } from "react-redux";
import {
  addProfile,
  addEducation,
  deleteEducation,
  addExperience,
  deleteExperience
} from "../../Stores/Actions";
const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => ({
  addProfile: postData => dispatch(addProfile(postData)),
  addExperience: postData => dispatch(addExperience(postData)),
  deleteExperience: id => dispatch(deleteExperience(id)),
  addEducation: postData => dispatch(addEducation(postData)),
  deleteEducation: id => dispatch(deleteEducation(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
