import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const CanvasTools = (props) => {
  const cn = bem("CanvasTools");

  return (
    <div className={cn()}>
      <button onClick={props.addCircle}>Circle</button>
    </div>
  );
};

CanvasTools.propTypes = {};

CanvasTools.defaultProps = {};

export default React.memo(CanvasTools);
