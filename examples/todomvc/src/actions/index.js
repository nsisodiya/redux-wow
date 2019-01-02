import { createActionsFromReducer } from "./../redux-wow";
import todos from "./../reducers/todos";
import visibilityFilter from "./../reducers/visibilityFilter";
import { dispatch } from "./../reducers/store";

export default {
  [todos.namespace]: createActionsFromReducer(todos, dispatch),
  [visibilityFilter.namespace]: createActionsFromReducer(
    visibilityFilter,
    dispatch
  )
};
