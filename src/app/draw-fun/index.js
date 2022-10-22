import React from "react";
import useStore from "@src/hooks/use-store";
import useInit from "@src/hooks/use-init";
import Layout from "@src/components/layouts/layout";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import CanvasFun from "@src/components/elements/ canvas-fun";
import CanvasTools from "@src/components/elements/ canvas-fun/canvas-tools";
import useSelector from "@src/hooks/use-selector";

function DrawFun() {
  const store = useStore();

  const callbacks = {
    addCircle: React.useCallback(() => {
      store
        .get("drawFun")
        .addFigure(
          "circle",
          [Math.random() * 800, Math.random() * 700, Math.random() * 100 + 20],
          performance.now()
        ),
        [];
    }),
    onMouseWheel: React.useCallback((e) => {
      store.get("drawFun").onMouseWheel(e);
    }, []),
    setIsMouseDown: React.useCallback(
      () => store.get("drawFun").setIsMouseDown(),
      []
    ),
    onMouseMove: React.useCallback(
      (e) => store.get("drawFun").onMouseMove(e),
      []
    ),
  };

  const select = useSelector((state) => ({
    figures: state.drawFun.figures,
    scroll: state.drawFun.scroll,
    scale: state.drawFun.scale,
    isMouseDown: state.drawFun.isMouseDown,
    cursor: state.drawFun.cursor,
  }));

  return (
    <Layout>
      <TopContainer />
      <HeadContainer />
      <ToolsContainer />
      <CanvasTools addCircle={callbacks.addCircle} />
      <CanvasFun
        figures={select.figures}
        scroll={select.scroll}
        scale={select.scale}
        onMouseWheel={callbacks.onMouseWheel}
        onMouseMove={callbacks.onMouseMove}
        setIsMouseDown={callbacks.setIsMouseDown}
        isMouseDown={select.isMouseDown}
        cursor={select.cursor}
      />
    </Layout>
  );
}

export default React.memo(DrawFun);
