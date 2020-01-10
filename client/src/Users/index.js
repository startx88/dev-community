import Container from "./Container";
import { connect } from "react-redux";
import { getProfile } from "../Stores/Actions";

const mapStateToProps = state => ({ profile: state.profile });

const mapStateToDispatch = dispatch => ({
  getProfile: () => dispatch(getProfile())
});

export default connect(mapStateToProps, mapStateToDispatch)(Container);
