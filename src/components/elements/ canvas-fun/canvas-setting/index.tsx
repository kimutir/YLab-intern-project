import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { IFigure } from "../type";
import SettingCircle from "./setting-items/setting-circle";
import SettingTriangle from "./setting-items/setting-triangle";

interface CanvasSettingProps {
  selected: number;
  figures: IFigure;
  onSubmitChanges: (coord: number[] | number[][]) => void;
}

function CanvasSetting(props: CanvasSettingProps) {
  const cn = bem("CanvasSetting");

  const render: () => any = React.useCallback(() => {
    const selected: IFigure = props.figures[props.selected];

    if (selected.type === "circle") {
      const [x, y, r] = selected.coordinates as number[];

      return (
        <SettingCircle x={x} y={y} r={r} onSubmit={props.onSubmitChanges} />
      );
    }

    if (selected.type === "triangle") {
      const [a, b, c] = selected.coordinates as number[][];

      return (
        <SettingTriangle
          coordinates={[a, b, c]}
          onSubmit={props.onSubmitChanges}
        />
      );
    }
  }, [props.selected, props.figures]);

  return props.selected ? render() : "Выберите фигуру";
}

export default React.memo(CanvasSetting);
