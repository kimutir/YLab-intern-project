import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function SelectorItem(props) {
  const cn = bem("SelectorItem");
  const itemRef = React.useRef();
  const iconRef = React.useRef();
  const titleRef = React.useRef();

  const [isLong, setIsLong] = React.useState(false);

  React.useEffect(() => {
    itemRef.current.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.code === "Enter") {
        console.log("clicked");
        props.onSelect(props.item._id);
      }
    });
    if (itemRef.current.scrollWidth > 230) {
      titleRef.current.textContent =
        titleRef.current.textContent.slice(0, 20) + " ...";

      setIsLong(true);
    }
  });

  const iconCreator = React.useCallback(
    (name) => name?.slice(0, 2).toUpperCase(),
    []
  );

  return (
    <div
      id={props.item._id}
      ref={itemRef}
      className={
        props.selected ? cn("selected") : props.head ? cn("head") : cn()
      }
      onClick={() => props.onSelect(props.item._id)}
      tabIndex={props.tab}
      title={isLong ? props.item.title : ""}
    >
      <div className={cn("icon")} ref={iconRef}>
        {props.item.icon ? props.item.icon : iconCreator(props.item.title)}
      </div>

      <div className={cn("title")} ref={titleRef}>
        {props.item.title}
      </div>
    </div>
  );
}

SelectorItem.propTypes = {};

SelectorItem.defaultProps = {
  onSelect: () => {},
};

export default React.memo(SelectorItem);
