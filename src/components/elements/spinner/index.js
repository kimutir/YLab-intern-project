import React from "react";
import propTypes from "prop-types";
import PropTypes from "prop-types";
import "./style.css";

function Spinner(props) {
  if (props.active) {
    return <div>{props.children}</div>;
    // return props.children;
  } else {
    return props.children;
  }
}

Spinner.propTypes = {
  active: propTypes.bool.isRequired,
  children: PropTypes.node,
};

export default React.memo(Spinner);
