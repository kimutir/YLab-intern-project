import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useTranslate from "@src/hooks/use-translate";

type CanvasToolsProps = {
  addCircle: () => void;
  addTriangle: () => void;
  addLeaf: () => void;
};

const CanvasTools = (props: CanvasToolsProps) => {
  const cn = bem("CanvasTools");
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <button onClick={props.addCircle}>{t("canvas.circle")}</button>
      <button onClick={props.addTriangle}>{t("canvas.triangle")}</button>
      <button onClick={props.addLeaf}>{t("canvas.leaves")}</button>
    </div>
  );
};

export default React.memo(CanvasTools);
