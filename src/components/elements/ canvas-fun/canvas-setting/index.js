import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const CanvasSetting = (props) => {
  const cn = bem("CanvasSetting");

  return (
    <form className={cn()}>
      <input type="submit" value="Enter" />
    </form>
  );
};

CanvasSetting.propTypes = {};

CanvasSetting.defaultProps = {};

export default React.memo(CanvasSetting);
