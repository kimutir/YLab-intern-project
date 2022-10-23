import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import draw from "./draw-functions/draw";

const CanvasFun = (props) => {
  const cn = bem("CanvasFun");
  const wrapperRef = React.useRef();
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const width = wrapperRef.current.clientWidth;
    const height = wrapperRef.current.clientHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    canvasRef.current.addEventListener("wheel", props.onMouseWheel);
    canvasRef.current.addEventListener("mousedown", props.setIsMouseDown);
    canvasRef.current.addEventListener("mouseup", props.setIsMouseDown);
  }, []);

  React.useEffect(() => {
    if (props.isMouseDown) {
      canvasRef.current.addEventListener("mousemove", props.onMouseMove);
    }

    return () =>
      canvasRef.current.removeEventListener("mousemove", props.onMouseMove);
  }, [props.isMouseDown]);

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.save();
    // очистка
    ctx.fillStyle = "aliceblue";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // scroll
    ctx.translate(props.scroll.x, props.scroll.y);
    // scale
    ctx.scale(props.scale, props.scale);

    ctx.fillStyle = "#777";
    ctx.fillRect(10, 50, 200, 400);
    draw({
      ctx,
      figures: props.figures,
      scroll: props.scroll,
      scale: props.scale,
    });
    ctx.restore();
  }, [props.figures, props.scroll, props.scale]);

  return (
    <div className={cn()} ref={wrapperRef}>
      <canvas className={cn("canvas")} ref={canvasRef} />
    </div>
  );
};

CanvasFun.propTypes = {};

CanvasFun.defaultProps = {};

export default React.memo(CanvasFun);
