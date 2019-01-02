import { createReducer } from "../redux-wow";
export default createReducer({
  namespace: "Todos",
  initialState: [
    {
      text: "Use Redux",
      completed: false,
      id: 0
    }
  ],
  addTodo(state, text) {
    state.push({
      text,
      completed: false,
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
    });
  },
  deleteTodo(state, id) {
    var dIndex = -1;
    state.forEach((todo, index) => {
      if (todo.id === id) {
        dIndex = index;
      }
    });
    state.splice(dIndex, 1);
  },
  editTodo(state, id, text) {
    state.forEach(todo => {
      if (todo.id === id) {
        todo.text = text;
      }
    });
  },
  completeTodo(state, id) {
    state.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
  },
  completeAllTodos(state) {
    state.forEach(todo => {
      todo.completed = true;
    });
  },
  clearCompleted(state) {
    for (let index = 0; index < state.length; index++) {
      const todo = state[index];
      if (todo.completed === true) {
        state.splice(index, 1);
        index--;
      }
    }
  }
});
