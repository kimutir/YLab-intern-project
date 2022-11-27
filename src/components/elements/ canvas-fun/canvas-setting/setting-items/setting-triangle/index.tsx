import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface SettingTriangleProps {
  coordinates: number[][];
  onSubmit: (coord: number[][]) => void;
}

const SettingTriangle = (props: SettingTriangleProps) => {
  const cn = bem("SettingTriangle");

  const [coords, setCoords] = React.useState(props.coordinates);

  React.useEffect(() => {
    setCoords(props.coordinates);
  }, [props.coordinates]);

  // Изменение координат треугольника
  const onChange = React.useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      index1: number,
      index2: number
    ) => {
      e.preventDefault();
      const arr = [...coords];
      // Выбираем одну из вершин
      const newCoordinate = arr[index1];
      // Изменяем x или y вершины
      newCoordinate[index2] = Number(e.target.value);
      arr.splice(index1, 1, newCoordinate);
      setCoords(arr);
    },
    [coords]
  );

  return (
    <form
      className={cn()}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(coords);
      }}
    >
      {props.coordinates.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={Math.round(coords[index][0])}
            onChange={(e) => onChange(e, index, 0)}
          />
          <input
            type="text"
            value={Math.round(coords[index][1])}
            onChange={(e) => onChange(e, index, 1)}
          />
        </div>
      ))}

      <input type="submit" value="Enter" />
    </form>
  );
};

export default React.memo(SettingTriangle);
