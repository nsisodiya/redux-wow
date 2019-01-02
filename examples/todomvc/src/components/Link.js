import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Link = ({ active, children, actions, filter }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    className={classnames({ selected: active })}
    style={{ cursor: "pointer" }}
    onClick={() => actions.setFilter(filter)}
  >
    {children}
  </a>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default Link;
