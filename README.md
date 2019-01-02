# redux-wow

Most simple (opinionated) way to use Redux in your application.

# Motivation

- **Less Boilerplate** : Automatically Generate actions from Reducer definitions.
- **Better Readability** : Instead of Switch case, Redux-wow use functions and object.
- **Better Syntax** : Use immutable state without using `...state` kind of syntax. redux-wow use immer internally.

# TODOS Reducere

## Using Redux

```js
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from "../constants/ActionTypes";
const initialState = [
  {
    text: "Use Redux",
    completed: false,
    id: 0
  }
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ];

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
}
```

## Using Redux with Redux WOW

```js
import { createReducer } from "redux-wow";

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
```

# VISIBILITY_FILTER Reducer

## Using Redux

```js
import { SET_VISIBILITY_FILTER } from "../constants/ActionTypes";
import { SHOW_ALL } from "../constants/TodoFilters";

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
```

## Using Redux with Redux WOW

```js
import { SHOW_ALL } from "../constants/TodoFilters";
import { createReducer } from "redux-wow";

export default createReducer({
  namespace: "VisibilityFilter",
  initialState: {
    filter: SHOW_ALL
  },
  setFilter(state, filter) {
    state.filter = filter;
  }
});
```

# Actions

## Using Redux (the normal way)

```js
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const COMPLETE_ALL_TODOS = "COMPLETE_ALL_TODOS";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const addTodo = text => ({ type: types.ADD_TODO, text });
export const deleteTodo = id => ({ type: types.DELETE_TODO, id });
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text });
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
```

## Using Redux with Redux Wow

```js
//Redux WOW automatically generate actions-dispatchers automatically.
import { createActionsFromReducer } from "redux-wow";
import todos from "../reducers/todos";
import visibilityFilter from "../reducers/visibilityFilter";
import { dispatch } from "../reducers/store";

export default {
  [todos.namespace]: createActionsFromReducer(todos, dispatch),
  [visibilityFilter.namespace]: createActionsFromReducer(
    visibilityFilter,
    dispatch
  )
};
```
