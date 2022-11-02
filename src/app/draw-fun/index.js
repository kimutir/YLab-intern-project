import React from "react";
import useStore from "@src/hooks/use-store";
import Layout from "@src/components/layouts/layout";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import CanvasFun from "@src/components/elements/ canvas-fun";
import CanvasTools from "@src/components/elements/ canvas-fun/canvas-tools";
import useSelector from "@src/hooks/use-selector";
import CanvasSetting from "@src/components/elements/ canvas-fun/canvas-setting";
import LayoutFlex from "@src/components/layouts/layout-flex";

function DrawFun() {
  const store = useStore();

  const select = useSelector((state) => ({
    figures: state.drawFun.figures,
    scroll: state.drawFun.scroll,
    scale: state.drawFun.scale,
    isMouseDown: state.drawFun.isMouseDown,
    selected: state.drawFun.selected,
  }));

  const callbacks = {
    addCircle: React.useCallback(() => {
      store.get("drawFun").addFigure({
        type: "circle",
        coordinates: [
          Math.random() * 800,
          Math.random() * 700,
          Math.random() * 100 + 20,
        ],
        date: performance.now(),
      }),
        [];
    }),
    addLeaf: React.useCallback(() => {
      store.get("drawFun").addFigure({
        type: "leaf",
        coordinates: [Math.random() * 800, -60, Math.random() * 20 + 40],
        date: performance.now(),
        animation: {
          offset: {
            duraction: Math.random() * 5 + 4,
            direction: [-1, 1][Math.floor(Math.random() * 2)],
            start: performance.now(),
          },
          rotation: {
            direction: [-1, 1][Math.floor(Math.random() * 2)],
            start: performance.now(),
            angle: 0,
          },
        },
      }),
        [];
    }),
    addTriangle: React.useCallback(() => {
      const xStart = Math.random() * 800;
      const yStart = Math.random() * 500;
      store.get("drawFun").addFigure({
        type: "triangle",
        coordinates: [
          [xStart, yStart],
          [xStart + Math.random() * 200, yStart + Math.random() * 300],
          [xStart + Math.random() * 100, yStart + Math.random() * 350],
        ],
        date: performance.now(),
      });
    }, []),
    onMouseWheel: React.useCallback((e) => {
      store.get("drawFun").onMouseWheel(e);
    }, []),
    onMouseDown: React.useCallback(
      (e) => store.get("drawFun").onMouseDown(e),
      []
    ),
    onMouseUp: React.useCallback(() => store.get("drawFun").onMouseUp(), []),
    onMouseMove: React.useCallback(
      (e) => store.get("drawFun").onMouseMove(e),
      []
    ),
    onFall: React.useCallback(
      (height) => store.get("drawFun").onFall({ height }),
      []
    ),
    onSubmitChanges: React.useCallback(
      (args) => store.get("drawFun").onSubmitChanges(args),
      []
    ),
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer />
      <ToolsContainer />
      <LayoutFlex>
        <CanvasTools
          addCircle={callbacks.addCircle}
          addTriangle={callbacks.addTriangle}
          addLeaf={callbacks.addLeaf}
        />
        <CanvasSetting
          selected={select.selected}
          figures={select.figures}
          onSubmitChanges={callbacks.onSubmitChanges}
        />
      </LayoutFlex>
      <CanvasFun
        figures={select.figures}
        scroll={select.scroll}
        scale={select.scale}
        onMouseWheel={callbacks.onMouseWheel}
        onMouseMove={callbacks.onMouseMove}
        onMouseDown={callbacks.onMouseDown}
        onMouseUp={callbacks.onMouseUp}
        isMouseDown={select.isMouseDown}
        selected={select.selected}
        onFall={callbacks.onFall}
      />
    </Layout>
  );
}

export default React.memo(DrawFun);
