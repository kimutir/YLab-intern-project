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
import Figure from "@src/canvasDrawing/figure";
import Circle from "@src/canvasDrawing/circle";

function Canvas() {
  const cn = bem("Canvas");

  const canvasRef = React.useRef();
  const canvasFieldRef = React.useRef();

  const store = useStore();

  const [isDropped, setIsDropped] = React.useState(false);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [start, setStart] = React.useState(0);
  const [prev, setPrev] = React.useState({ x: 0, y: 0 });
  const [radius, setRadius] = React.useState(0);

  const select = useSelector((state) => ({
    rectangles: state.canvas.rectangles,
    triangles: state.canvas.triangles,
    circles: state.canvas.circles,
    delta: state.canvas.delta,
    scale: state.canvas.scale,
    animationLifeTime: state.canvas.animationLifeTime,
    cursor: state.canvas.cursor,
    cursorPrev: state.canvas.cursor.prev,
    test: state.canvas.test,
  }));

  //   const obj = new Figure({ scale: 2 });
  //   console.log("obj:", obj);
  //   const cir = new Circle({ name: "circle" });
  //   console.log("cir:", cir);
  //   console.log("cir:", cir.scale);

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
    changeScale: React.useCallback((mult, cursor) => {
      store.get("canvas").changeScale({ mult, cursor });
    }, []),
    onMouseDown: React.useCallback((e) => {
      store.get("canvas").changeDelta(e.movementX, e.movementY);
    }, []),
    resetStore: React.useCallback(() => store.get("canvas").resetStore()),
    changeRadius: React.useCallback((r) => store.get("canvas").changeRadius(r)),
    changeCursorPosition: React.useCallback((e) =>
      store.get("canvas").changeCursorPosition(e.clientX, e.clientY)
    ),
    addCircle: React.useCallback(
      () =>
        store
          .get("canvas")
          .addCoordinates(
            "circles",
            [
              Math.random() * 800,
              Math.random() * 700,
              Math.random() * 100 + 20,
            ],
            start,
            false,
            0
          ),
      [start]
    ),
    changeSelected: React.useCallback(
      (date) => store.get("canvas").changeSelected(date),
      []
    ),
    changeFallDistance: React.useCallback(
      (date, distance) =>
        store.get("canvas").changeFallDistance(date, distance),
      []
    ),
  };

  // слушатели и скролл
  React.useEffect(() => {
    canvasFieldRef.current?.addEventListener("wheel", (e) => {
      //   console.log("e:", e);
      if (e.shiftKey) {
        callbacks.changeCursorPosition(e);

        callbacks.changeScale(e.deltaY > 0 ? 1.03 : 0.95, {
          x: e.offsetX,
          y: e.offsetY,
        });
      } else {
        callbacks.changeDelta(0, e.deltaY > 0 ? 5 : -5);
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
      select.delta,
      height,
      width,
      select.scale,
      select.cursor,
      select.circles,
      callbacks.changeSelected,
      prev,
      setPrev,
      callbacks.changeFallDistance,
      setRadius
    );

    generateTriangle(ctx, select.triangles, select.delta, height);
  }, [
    select.delta,
    select.scale,
    select.rectangles,
    select.circles,
    select.triangles,
    start,
    select.cursor,
    select.test,
    prev,
    setPrev,
  ]);

  React.useEffect(() => {
    for (const circle in select.test) {
      if (select.test[circle].selected) {
        setRadius(select.test[circle].coordinates[2]);
      }
    }
  }, [select.test]);

  return (
    <Layout>
      <div className={cn()} ref={canvasRef}>
        <div className={cn("tools")}>
          <button onClick={callbacks.addRectangle}>Rect</button>
          <button onClick={callbacks.addCircle}>Circle</button>
          <button onClick={callbacks.addTriangle}>Triangle</button>
          <button onClick={callbacks.test}>Test</button>
          <button onClick={() => setIsDropped((prev) => !prev)}>Drop</button>
          <button onClick={callbacks.resetStore}>Clear</button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              callbacks.changeRadius(radius);
            }}
          >
            <input
              type="text"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
            <input type="submit" />
          </form>
        </div>
        <canvas
          ref={canvasFieldRef}
          className={cn("field")}
          onClick={(e) => setPrev({ x: e.clientX, y: e.clientY })}
        ></canvas>
      </div>
    </Layout>
  );
}

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default React.memo(Canvas);
