import React, { useCallback } from "react";
import "./style.css";

interface SelectProps {
  value: string;
  onChange: (sort: string, page: number, reset: boolean) => void;
  options: { value: string; title: string }[];
}

function Select(props: SelectProps) {
  const onSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      props.onChange(e.target.value, 1, true);
    },
    [props.onChange]
  );

  return (
    <select className="Select" onChange={onSelect} value={props.value}>
      {props.options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

export default React.memo(Select);
