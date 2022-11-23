import React from "react";
import propTypes from "prop-types";
import PropTypes from "prop-types";
import "./style.css";

interface SpinnerProps {
  active: boolean;
  children: JSX.Element;
}

function Spinner(props: SpinnerProps) {
  if (props.active) {
    return <div>{props.children}</div>;
  } else {
    return props.children;
  }
}

export default React.memo(Spinner);
