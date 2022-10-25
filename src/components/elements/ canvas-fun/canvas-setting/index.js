import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import SettingCircle from "./setting-items/setting-circle";
import SettingTriangle from "./setting-items/setting-triangle";

const CanvasSetting = (props) => {
  const cn = bem("CanvasSetting");

  const render = React.useCallback(() => {
    const selected = props.figures[props.selected];
    if (selected?.type === "circle") {
      const [x, y, r] = selected.coordinates;

      return (
        <SettingCircle x={x} y={y} r={r} onSubmit={props.onSubmitChanges} />
      );
    }
    if (selected?.type === "triangle") {
      const [a, b, c] = selected.coordinates;

      return (
        <SettingTriangle
          coordinates={[a, b, c]}
          onSubmit={props.onSubmitChanges}
        />
      );
    }
  }, [props.selected, props.figures]);

  return props.selected ? render() : "Выберите фигуру";
};

CanvasSetting.propTypes = {};

CanvasSetting.defaultProps = {};

export default React.memo(CanvasSetting);
