import React, { useCallback, useEffect, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import debounce from "lodash.debounce";
import "./style.css";

type InputProps = {
  onChange: (
    value: string,
    page: number,
    reset: boolean
  ) => Promise<void> | void;
  onReset?: () => Promise<void>;
  limit?: number;
  page?: number;
  theme?: string;
  value: string;
  placeholder?: string;
  name?: string;
  type?: string;
};

function Input(props: InputProps) {
  const cn = bem("Input");

  // Внутренний стейт по умолчанию с переданным value
  const [value, setValue] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(
    debounce((value: string) => props.onChange(value, 1, true), 600),
    [props.onChange, props.name]
  );

  // Обработчик изменений в поле
  const onChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setValue(event.target.value);
      changeThrottle(event.target.value);
    },
    [setValue, changeThrottle]
  );

  // Обновление стейта, если передан новый value
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <input
      className={cn({ theme: props.theme })}
      name={props.name}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  );
}

export default React.memo(Input);
