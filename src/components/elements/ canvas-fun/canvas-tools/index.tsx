import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

type CanvasToolsProps = {
  addCircle: () => void;
  addTriangle: () => void;
  addLeaf: () => void;
};

const CanvasTools = (props: CanvasToolsProps) => {
  const cn = bem("CanvasTools");

  return (
    <div className={cn()}>
      <button onClick={props.addCircle}>Circle</button>
      <button onClick={props.addTriangle}>Triangle</button>
      <button onClick={props.addLeaf}>Leaf</button>
    </div>
  );
};

export default React.memo(CanvasTools);
