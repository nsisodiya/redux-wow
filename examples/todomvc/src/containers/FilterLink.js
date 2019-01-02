import { connect } from "react-redux";
import actions from "../actions";
import Link from "../components/Link";

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter.filter,
  actions: actions.VisibilityFilter
});

export default connect(
  mapStateToProps,
  {}
)(Link);
