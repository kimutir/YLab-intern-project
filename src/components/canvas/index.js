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
  const [index, setIndex] = React.useState(0);
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const select = useSelector((state) => ({
    rectangles: state.canvas.rectangles,
    triangles: state.canvas.triangles,
    circles: state.canvas.circles,
    delta: state.canvas.delta,
    scale: state.canvas.scale,
    animationLifeTime: state.canvas.animationLifeTime,
  }));

  // хук возвращает время начала и вызывает callback
  const { startTime } = useAnimate(
    (value) => store.get("canvas").changeTime(value),
    isDropped
  );

  const callbacks = {
    addRectangle: React.useCallback(
      () =>
        store
          .get("canvas")
          .addCoordinates("rectangles", [
            Math.random() * 500,
            Math.random() * 500 - 300,
            Math.random() * 100 + 10,
            Math.random() * 100 + 10,
          ]),
      []
    ),
    addCircle: React.useCallback(() => {
      // нужно изменить логику добавления индекса
      if (drop) {
        setIndex((prev) => prev + 1);
      }
      store
        .get("canvas")
        .addCoordinates(
          "circles",
          [
            Math.random() * 1000,
            Math.random() * 2400 - 1500,
            Math.random() * 100,
          ],
          index,
          startTime ? Date.now() - startTime : 0
        );
    }, [index, isDropped]),
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

    // generateRectangle(
    //   ctx,
    //   select.rectangles,
    //   select.delta,
    //   height,
    //   select.scale,
    //   dropStep
    // );
    select.circles.length &&
      generateCircle(
        ctx,
        select.circles,
        select.delta,
        height,
        select.scale,
        select.animationLifeTime
      );
    // const a = generateTriangle(ctx, select.triangles, deltaX, deltaY, height);
    // select.triangles.lenght  && a();
  }, [
    select.delta,
    select.scale,
    select.rectangles,
    select.circles,
    select.triangles,
    select.animationLifeTime,
  ]);

  // создать ограничение вызова requestAnimationFrame

  // ограничить падение фигур
  // не рисовать фигуры вне поля, а просто считать координаты

  return (
    <Layout>
      <div className={cn()} ref={canvasRef}>
        <div className={cn("tools")}>
          <button onClick={callbacks.addRectangle}>Rect</button>
          <button onClick={callbacks.addCircle}>Circle</button>
          <button onClick={callbacks.addTriangle}>Triangle</button>
          <button onClick={() => setIsDropped((prev) => !prev)}>Drop</button>
        </div>
        <canvas ref={canvasFieldRef} className={cn("field")}></canvas>
      </div>
    </Layout>
  );
}

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default React.memo(Canvas);
