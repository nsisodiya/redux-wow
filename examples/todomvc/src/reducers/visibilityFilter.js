import { SHOW_ALL } from "../constants/TodoFilters";
import { createReducer } from "../redux-wow";

export default createReducer({
  namespace: "VisibilityFilter",
  initialState: {
    filter: SHOW_ALL
  },
  setFilter(state, filter) {
    state.filter = filter;
  }
});
