import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import SelectorItem from "./selector-item";

function CustomSelector(props) {
  const cn = bem("CustomSelector");

  const [search, setSearch] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const listRef = React.useRef();
  const bodyRef = React.useRef();

  // показываем - убираем всплывашку
  const show = React.useCallback(
    (value) => {
      value === undefined && setVisible((prev) => !prev);
      value === true && setVisible(true);
      value === false && setVisible(false);
      !visible && setSearch("");
      visible && props.onSearch("");
      // document.getElementById(props.selected).scrollIntoView(top);
    },
    [visible]
  );

  const onKeyShow = React.useCallback((e) => {
    e.code === "Enter" && show(true);
    if (e.keyCode === 27) {
      show(false);
      setSearch("");
    }
  }, []);

  // поиск
  const onChange = React.useCallback((e) => {
    setSearch(e.target.value);
    listRef.current.scrollTo(0, 0);
    props.onSearch(e.target.value);
  }, []);

  // выбор
  const onSelect = React.useCallback(
    (id) => {
      setVisible(false);
      props.onSearch("");
      props.onSelect(id);
    },
    [props.value]
  );

  // рендер выбранного элемента
  const renderSelectedItem = React.useCallback(() => {
    const selected = props.value.find((i) => i._id === props.selected);

    // console.log("el", document.getElementById(`${props.selected}`));
    if (selected) return <SelectorItem item={selected} head={true} />;

    return props.default;
  }, [props.selected]);

  // навигация по стрелкам
  React.useEffect(() => {
    let x = -1;
    if (visible) {
      const items = [
        bodyRef.current.childNodes[0],
        ...bodyRef.current.childNodes[1].childNodes,
      ];

      // const items = listRef.current.children;

      bodyRef.current.addEventListener(
        "keydown",
        (e) => {
          // e.preventDefault();
          if (e.code === "ArrowDown" && x < items.length - 1) x += 1;
          if (e.code === "ArrowUp" && x > 0) x -= 1;
          if (x >= 0 && x < items.length) items[x].focus();
        },
        true
      );
    } else {
      x = -1;
    }
  }, [visible]);

  return (
    <div className={cn()} tabIndex="0" onKeyDown={(e) => onKeyShow(e)}>
      <div className={cn("head")}>
        <div className={cn("choosen")}>{renderSelectedItem()}</div>
        <button
          className={cn("btn")}
          onClick={() => {
            show();
          }}
          tabIndex="-1"
        />
      </div>

      {visible && (
        // <div className={cn("wrapper")}>
        <div className={cn("body")} tabIndex="0" ref={bodyRef}>
          <input
            tabIndex="0"
            type="text"
            className={cn("search")}
            placeholder="Поиск"
            value={search}
            onChange={(e) => onChange(e)}
          />
          <div tabIndex="0" ref={listRef} className={cn("list")}>
            {props.value.map((i, index) => (
              <SelectorItem
                tab={index + 1}
                key={i._id}
                item={i}
                selected={props.selected === i._id ? true : false}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
        // </div>
      )}
    </div>
  );
}

CustomSelector.propTypes = {};

CustomSelector.defaultProps = {};

export default React.memo(CustomSelector);
