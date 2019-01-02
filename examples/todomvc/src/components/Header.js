import React from "react";
import PropTypes from "prop-types";
import TodoTextInput from "./TodoTextInput";

const Header = ({ actions }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={text => {
        if (text.length !== 0) {
          actions.addTodo(text);
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
);

Header.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Header;
