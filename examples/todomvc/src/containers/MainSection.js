import { connect } from "react-redux";
import actions from "../actions";
import MainSection from "../components/MainSection";
import { getCompletedTodoCount } from "../selectors";

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state),
  actions: actions.Todos
});

export default connect(
  mapStateToProps,
  {}
)(MainSection);
