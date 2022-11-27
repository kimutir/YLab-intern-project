import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface SettingCircleProps {
  x: number;
  y: number;
  r: number;
  onSubmit: (arg: number[]) => void;
}

function SettingCircle(props: SettingCircleProps) {
  const cn = bem("SettingCircle");

  const [x, setX] = React.useState(props.x);
  const [y, setY] = React.useState(props.y);
  const [r, setR] = React.useState(props.r);

  React.useEffect(() => {
    setX(props.x);
    setY(props.y);
    setR(props.r);
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
        onChange={(e) => setX(Number(e.target.value))}
      />
      <input
        type="text"
        value={Math.round(y)}
        onChange={(e) => setY(Number(e.target.value))}
      />
      <input
        type="text"
        value={Math.round(r)}
        onChange={(e) => setR(Number(e.target.value))}
      />
      <input type="submit" value="Enter" />
    </form>
  );
}

export default React.memo(SettingCircle);
