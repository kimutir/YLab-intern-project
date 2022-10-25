import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const SettingTriangle = (props) => {
  const cn = bem("SettingTriangle");

  const [coords, setCoords] = React.useState(props.coordinates);

  React.useEffect(() => {
    setCoords(props.coordinates);
  }, [props.coordinates]);

  const onChange = React.useCallback(
    (e, index1, index2) => {
      e.preventDefault();
      const arr = [...coords];
      const newCoordinate = arr[index1];
      newCoordinate[index2] = Number(e.target.value);
      arr.slice(index1, 1, newCoordinate);
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

SettingTriangle.propTypes = {};

SettingTriangle.defaultProps = {};

export default React.memo(SettingTriangle);
