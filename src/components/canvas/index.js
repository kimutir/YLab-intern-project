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

function Canvas() {
  const cn = bem("Canvas");

  const timeOfCreate = React.useRef();
  const timeOfOtherCreate = React.useRef([]);

  const lifeOfDropping = React.useRef([]);
  //   const timeOfCreate = React.useRef([]);

  const canvasRef = React.useRef();
  const canvasFieldRef = React.useRef();
  const store = useStore();

  const [dropStep, setDropStep] = React.useState([0]);
  const [drop, setDrop] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const select = useSelector((state) => ({
    rectangles: state.canvas.rectangles,
    triangles: state.canvas.triangles,
    circles: state.canvas.circles,
    delta: state.canvas.delta,
    scale: state.canvas.scale,
  }));

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
      if (drop) {
        setIndex((prev) => prev + 1);
        timeOfOtherCreate.current = [
          ...timeOfOtherCreate.current,
          Date.now() - timeOfCreate.current,
        ];
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
          index
        );
    }, [timeOfCreate.current, index, drop]),
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
    // console.log("height:", height);
    canvasFieldRef.current.width = width;
    canvasFieldRef.current.height = height;

    const ctx = canvasFieldRef.current.getContext("2d");

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    // generateRectangle(
    //   ctx,
    //   select.rectangles,
    //   select.delta,
    //   height,
    //   select.scale,
    //   dropStep
    // );
    console.log("dropStep:", dropStep);
    select.circles.length &&
      generateCircle(
        ctx,
        select.circles,
        select.delta,
        height,
        select.scale,
        dropStep
      );
    // const a = generateTriangle(ctx, select.triangles, deltaX, deltaY, height);
    // select.triangles.lenght  && a();
  }, [
    select.delta,
    select.scale,
    select.rectangles,
    select.circles,
    select.triangles,
    dropStep,
  ]);

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const timeOfDropping = React.useRef(0);
  const prevTimeOfDroppping = React.useRef(0);

  const animate = React.useCallback((time) => {
    timeOfDropping.current =
      prevTimeOfDroppping.current + Date.now() - timeOfCreate.current;

    lifeOfDropping.current = [
      timeOfDropping.current,
      ...timeOfOtherCreate.current.map((time) => timeOfDropping.current - time),
    ];

    setDropStep(() => lifeOfDropping.current.map((i) => estimateDrop(i)));

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  function estimateDrop(time) {
    return Math.pow(time * 0.001, 2) * 20;
  }

  React.useEffect(() => {
    if (drop) {
      timeOfCreate.current = Date.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      prevTimeOfDroppping.current = 0;
      prevTimeOfDroppping.current += timeOfDropping.current;
      cancelAnimationFrame(requestRef.current);
    }
  }, [drop]);

  return (
    <Layout>
      <div className={cn()} ref={canvasRef}>
        <div className={cn("tools")}>
          <button onClick={callbacks.addRectangle}>Rect</button>
          <button onClick={callbacks.addCircle}>Circle</button>
          <button onClick={callbacks.addTriangle}>Triangle</button>
          <button onClick={() => setDrop((prev) => !prev)}>Drop</button>
        </div>
        <canvas ref={canvasFieldRef} className={cn("field")}></canvas>
      </div>
    </Layout>
  );
}

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default React.memo(Canvas);
