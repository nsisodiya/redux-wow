import { connect } from "react-redux";
import Header from "../components/Header";
import actions from "../actions";
const mapStateToProps = state => ({
  actions: actions.Todos
});

export default connect(
  mapStateToProps,
  {}
)(Header);
