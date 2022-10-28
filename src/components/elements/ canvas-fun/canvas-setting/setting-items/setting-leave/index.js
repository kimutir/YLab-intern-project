import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const SettingCircle = (props) => {
  const cn = bem("SettingCircle");

  const [x, setX] = React.useState(props.x);
  const [y, setY] = React.useState(props.y);
  const [r, setR] = React.useState(props.r);

  React.useEffect(() => {
    setX(props.x);
    setY(props.y);
    setR(props.r);
    console.log(props.y);
  }, [props]);

  return (
    <form
      className={cn()}
      onSubmit={(e) => {
        e.preventDefault();
        const arr = [x, y, r];
        props.onSubmit(arr.map((i) => Number(i)));
      }}
    >
      <input
        type="text"
        value={Math.round(x)}
        onChange={(e) => setX(e.target.value)}
      />
      <input
        type="text"
        value={Math.round(y)}
        onChange={(e) => setY(e.target.value)}
      />
      <input
        type="text"
        value={Math.round(r)}
        onChange={(e) => setR(e.target.value)}
      />
      <input type="submit" value="Enter" />
    </form>
  );
};

SettingCircle.propTypes = {};

SettingCircle.defaultProps = {};

export default React.memo(SettingCircle);
