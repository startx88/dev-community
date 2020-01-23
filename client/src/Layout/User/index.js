import Container from "./Container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userSelecotrWithProfile } from "../../Stores/Selectors";

const mapStateToProps = createStructuredSelector({
  state: userSelecotrWithProfile
});
export default connect(mapStateToProps)(Container);
