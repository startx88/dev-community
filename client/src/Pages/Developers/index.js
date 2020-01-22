import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAllProfiles } from "../../Stores/Actions";
import { selectUserProfile } from "../../Stores/Selectors";

/**
 * Connect with redux
 */

const mapStateToProps = createStructuredSelector({
  allProfile: selectUserProfile
});

const mapDispatchToProps = dispatch => ({
  getAllProfiles: () => dispatch(getAllProfiles())
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
