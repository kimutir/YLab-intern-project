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

function DrawFun() {
  const store = useStore();

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
    onMouseWheel: React.useCallback((e) => {
      store.get("drawFun").onMouseWheel(e);
    }, []),
    setIsMouseDown: React.useCallback(
      (e) => store.get("drawFun").setIsMouseDown(e),
      []
    ),
    onMouseMove: React.useCallback(
      (e) => store.get("drawFun").onMouseMove(e),
      []
    ),
    fall: React.useCallback(
      (height) => store.get("drawFun").fall({ height }),
      []
    ),
  };

  const select = useSelector((state) => ({
    figures: state.drawFun.figures,
    scroll: state.drawFun.scroll,
    scale: state.drawFun.scale,
    isMouseDown: state.drawFun.isMouseDown,
    selected: state.drawFun.selected,
  }));

  return (
    <Layout>
      <TopContainer />
      <HeadContainer />
      <ToolsContainer />
      <CanvasTools addCircle={callbacks.addCircle} />
      <CanvasSetting />
      <CanvasFun
        figures={select.figures}
        scroll={select.scroll}
        scale={select.scale}
        onMouseWheel={callbacks.onMouseWheel}
        onMouseMove={callbacks.onMouseMove}
        setIsMouseDown={callbacks.setIsMouseDown}
        isMouseDown={select.isMouseDown}
        selected={select.selected}
        fall={callbacks.fall}
      />
    </Layout>
  );
}

export default React.memo(DrawFun);
