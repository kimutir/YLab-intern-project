import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import draw from "./draw-functions/draw";
import useAnimate from "@src/hooks/use-animation";

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
    canvasRef.current.addEventListener("mousedown", props.onMouseDown);
    canvasRef.current.addEventListener("mouseup", props.onMouseUp);
    canvasRef.current.addEventListener("mousemove", props.onMouseMove);
  }, []);

  useAnimate(() => props.onFall(canvasRef.current.height), true);

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.save();
    ctx.fillStyle = "aliceblue";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.translate(-props.scroll.x, -props.scroll.y);

    draw({
      ctx,
      figures: props.figures,
      scroll: props.scroll,
      scale: props.scale,
      view: {
        width: canvasRef.current.width,
        height: canvasRef.current.height,
      },
      selected: props.selected,
    });
    ctx.restore();
  }, [props.figures, props.scroll, props.scale, props.selected]);

  return (
    <div className={cn()} ref={wrapperRef}>
      <canvas className={cn("canvas")} ref={canvasRef} />
    </div>
  );
};

CanvasFun.propTypes = {};

CanvasFun.defaultProps = {};

export default React.memo(CanvasFun);
