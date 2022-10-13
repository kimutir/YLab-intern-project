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

  const canvasRef = React.useRef();
  const canvasFieldRef = React.useRef();
  const store = useStore();

  const [deltaY, setDeltaY] = React.useState(0);
  const [deltaX, setDeltaX] = React.useState(0);
  const [scale, setScale] = React.useState(0);
  const [drop, setDrop] = React.useState(false);
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const select = useSelector((state) => ({
    rectangles: state.canvas.rectangles,
    triangles: state.canvas.triangles,
    circles: state.canvas.circles,
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
    addCircle: React.useCallback(
      () =>
        store
          .get("canvas")
          .addCoordinates("circles", [
            Math.random() * 500,
            Math.random() * 500,
            Math.random() * 100,
          ]),
      []
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
    onMouseMove: React.useCallback((e) => {
      setDeltaY((prev) => prev + e.movementY);
      setDeltaX((prev) => prev + e.movementX);
    }, []),
  };

  React.useEffect(() => {
    canvasFieldRef.current?.addEventListener("wheel", (e) => {
      if (e.shiftKey) {
        setScale((prev) => prev - e.deltaY / 10);
      } else {
        setDeltaY((prev) => prev - e.deltaY);
      }
    });

    canvasFieldRef.current?.addEventListener("mousedown", (e) => {
      setIsMouseDown(true);
    });

    canvasFieldRef.current?.addEventListener("mouseup", (e) => {
      setIsMouseDown(false);
    });
  }, []);

  React.useEffect(() => {
    if (isMouseDown) {
      canvasFieldRef.current?.addEventListener(
        "mousemove",
        callbacks.onMouseMove
      );
    }

    return () =>
      canvasFieldRef.current?.removeEventListener(
        "mousemove",
        callbacks.onMouseMove
      );
  }, [isMouseDown]);

  React.useEffect(() => {
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight - 50;
    canvasFieldRef.current.width = width;
    canvasFieldRef.current.height = height;

    const ctx = canvasFieldRef.current.getContext("2d");

    console.log("scale:", scale);
    generateRectangle(ctx, select.rectangles, deltaX, deltaY, height, scale);

    generateCircle(ctx, select.circles, deltaX, deltaY, height, scale);

    generateTriangle(ctx, select.triangles, deltaX, deltaY, height);
  }, [
    deltaY,
    deltaX,
    scale,
    select.rectangles,
    select.circles,
    select.triangles,
  ]);

  const test = React.useCallback(() => {
    setDrop(!drop);
    let delayTest = 100;
    const delayId = setInterval(() => {
      console.log("delayTest:", delayTest);

      if (delayTest === 0) {
        console.log("asasd");
        clearInterval(delayId);
      }
      delayTest -= 10;
      const diffId = setInterval(() => {
        console.log("delta");
        setDeltaY((prev) => prev + 1);
      }, delayTest);
    }, 500);
  }, []);

  return (
    <Layout>
      <div className={cn()} ref={canvasRef}>
        <div className={cn("tools")}>
          <button onClick={callbacks.addRectangle}>Rect</button>
          <button onClick={callbacks.addCircle}>Circle</button>
          <button onClick={callbacks.addTriangle}>Triangle</button>
          <button onClick={test}>Drop</button>
        </div>
        <canvas ref={canvasFieldRef} className={cn("field")}></canvas>
      </div>
    </Layout>
  );
}

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default React.memo(Canvas);
