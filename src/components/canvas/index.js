import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Layout from "../layouts/layout";
import generateCircle from "./generators/circle";
import generateRectangle from "./generators/rectangle";
import generateTriangle from "./generators/triangle";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useAnimate from "@src/hooks/use-animation";

function Canvas() {
  const cn = bem("Canvas");

  const canvasRef = React.useRef();
  const canvasFieldRef = React.useRef();

  const store = useStore();

  const [isDropped, setIsDropped] = React.useState(false);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [start, setStart] = React.useState(0);
  console.log("start:", start);

  const select = useSelector((state) => ({
    rectangles: state.canvas.rectangles,
    triangles: state.canvas.triangles,
    circles: state.canvas.circles,
    delta: state.canvas.delta,
    scale: state.canvas.scale,
    animationLifeTime: state.canvas.animationLifeTime,
  }));

  // хук возвращает время начала и вызывает callback
  const { startTime } = useAnimate((value) => setStart(value), isDropped);

  const callbacks = {
    addRectangle: React.useCallback(
      () =>
        store
          .get("canvas")
          .addCoordinates(
            "rectangles",
            [
              Math.random() * 1000,
              Math.random() * 1400 - 700,
              Math.random() * 100 + 10,
              Math.random() * 100 + 10,
            ],
            !startTime && !isDropped ? 0 : select.animationLifeTime
          ),
      [startTime, isDropped, select.animationLifeTime]
    ),
    addCircle: React.useCallback(
      () =>
        store.get("canvas").addCoordinates(
          "circles",
          [
            Math.random() * 1000,
            Math.random() * 1400 - 700,
            Math.random() * 100,
          ],

          start
        ),
      [startTime, isDropped, start]
    ),
    addTriangle: React.useCallback(() => {
      const xStart = Math.random() * 500;
      const yStart = Math.random() * 500;
      store.get("canvas").addCoordinates("triangles", [
        [xStart, yStart],
        [xStart + Math.random() * 200, yStart + Math.random() * 300],
        [xStart + Math.random() * 100, yStart + Math.random() * 350],
      ]);
    }, []),
    changeDelta: React.useCallback((x, y) => {
      store.get("canvas").changeDelta(x, y);
    }, []),
    changeScale: React.useCallback((value) => {
      store.get("canvas").changeScale(value);
    }, []),
    onMouseDown: React.useCallback((e) => {
      store.get("canvas").changeDelta(e.movementX, e.movementY);
    }, []),
    changeBottomTime: React.useCallback((type, value) => {
      store.get("canvas").changeBottomTime(type, value);
    }, []),
    resetStore: React.useCallback(() => store.get("canvas").resetStore()),
  };

  // слушатели и скролл
  React.useEffect(() => {
    canvasFieldRef.current?.addEventListener("wheel", (e) => {
      if (e.shiftKey) {
        callbacks.changeScale(-e.deltaY / 10);
      } else {
        callbacks.changeDelta(0, -e.deltaY);
      }
    });

    canvasFieldRef.current?.addEventListener("mousedown", (e) => {
      setIsMouseDown(true);
    });

    canvasFieldRef.current?.addEventListener("mouseup", (e) => {
      setIsMouseDown(false);
    });
  }, []);

  // перемещение при зажатой ЛКМ
  React.useEffect(() => {
    if (isMouseDown) {
      canvasFieldRef.current?.addEventListener(
        "mousemove",
        callbacks.onMouseDown
      );
    }

    return () =>
      canvasFieldRef.current?.removeEventListener(
        "mousemove",
        callbacks.onMouseDown
      );
  }, [isMouseDown]);

  // отрисовка фигур
  React.useEffect(() => {
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight - 50;
    canvasFieldRef.current.width = width;
    canvasFieldRef.current.height = height;

    const ctx = canvasFieldRef.current.getContext("2d");

    generateRectangle(
      ctx,
      select.rectangles,
      select.delta,
      height,
      width,
      select.scale,
      select.animationLifeTime
    );

    generateCircle(
      ctx,
      select.circles,
      select.delta,
      height,
      width,
      select.scale
    );
    generateTriangle(ctx, select.triangles, select.delta, height);
  }, [
    select.delta,
    select.scale,
    select.rectangles,
    select.circles,
    select.triangles,
    start,
  ]);

  // как перестать считать падение для фигуры, если она на дне
  // вычитать время, которое находилось на дне?
  // вычитать расстояние, которое фигура прошла бы?

  return (
    <Layout>
      <div className={cn()} ref={canvasRef}>
        <div className={cn("tools")}>
          <button onClick={callbacks.addRectangle}>Rect</button>
          <button onClick={callbacks.addCircle}>Circle</button>
          <button onClick={callbacks.addTriangle}>Triangle</button>
          <button onClick={() => setIsDropped((prev) => !prev)}>Drop</button>
          <button onClick={callbacks.resetStore}>Clear</button>
        </div>
        <canvas ref={canvasFieldRef} className={cn("field")}></canvas>
      </div>
    </Layout>
  );
}

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default React.memo(Canvas);
