import { connect } from "react-redux";
import actions from "../actions";
import TodoList from "../components/TodoList";
import { getVisibleTodos } from "../selectors";

const mapStateToProps = state => ({
  filteredTodos: getVisibleTodos(state),
  actions: actions.Todos
});

const VisibleTodoList = connect(
  mapStateToProps,
  {}
)(TodoList);

export default VisibleTodoList;
