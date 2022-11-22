import React, { MouseEventHandler } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import draw from "./draw-functions/draw";
import useAnimate from "@src/hooks/use-animation";

type CanvasFunProps = {
  figures: {
    [key: number]: {
      type: string;
      coordinates: number[] | number[][];
      date: number;
      animation?: any;
    };
  };
  scroll: { x: number; y: number };
  scale: number;
  onMouseWheel: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: () => void;
  isMouseDown: boolean;
  selected: number;
  onFall: (a: number) => void;
};

const CanvasFun = (props: CanvasFunProps) => {
  const cn = bem("CanvasFun");
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  //  подписка на слушатели
  React.useEffect(() => {
    const width = wrapperRef?.current?.clientWidth || 0;
    const height = wrapperRef?.current?.clientHeight || 0;

    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }

    const canvas = canvasRef.current;

    canvas?.addEventListener("wheel", props.onMouseWheel);
    canvas?.addEventListener("mousedown", props.onMouseDown);
    canvas?.addEventListener("mouseup", props.onMouseUp);
    canvas?.addEventListener("mousemove", props.onMouseMove);
    return () => {
      canvas?.removeEventListener("wheel", props.onMouseWheel);
      canvas?.removeEventListener("mousedown", props.onMouseDown);
      canvas?.removeEventListener("mouseup", props.onMouseUp);
      canvas?.removeEventListener("mousemove", props.onMouseMove);
    };
  }, []);

  // анимация свободного падения
  useAnimate(() => props.onFall(canvasRef?.current?.height || 0), true);

  // рисование фигур
  React.useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d");

    if (ctx) {
      ctx.save();
      draw({
        ctx,
        figures: props.figures,
        scroll: props.scroll,
        scale: props.scale,
        view: {
          width: canvasRef?.current?.width || 0,
          height: canvasRef?.current?.height || 0,
        },
        selected: props.selected,
      });
      ctx.restore();
    }
  }, [props.figures, props.scroll, props.scale, props.selected]);

  return (
    <div className={cn()} ref={wrapperRef}>
      <canvas className={cn("canvas")} ref={canvasRef} />
    </div>
  );
};

export default React.memo(CanvasFun);
