import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

type SelectorItemProps = {
  tab?: number;
  key?: string;
  item: {
    _id: string;
    title: string;
    code: string;
    icon?: string;
  };
  selected?: boolean;
  onSelect: (id: string) => void;
  head?: boolean;
};

function SelectorItem(props: SelectorItemProps) {
  const cn = bem("SelectorItem");
  const itemRef = React.useRef<HTMLDivElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const [isLong, setIsLong] = React.useState(false);

  React.useEffect(() => {
    itemRef.current?.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.code === "Enter") {
        props.onSelect(props.item._id);
      }
    });
    if (itemRef.current?.scrollWidth && itemRef.current?.scrollWidth > 230) {
      if (titleRef.current?.textContent) {
        titleRef.current.textContent =
          titleRef.current?.textContent.slice(0, 20) + " ...";

        setIsLong(true);
      }
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
