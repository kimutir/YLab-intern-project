import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { ICountry } from "@src/store/countries/type";

interface SelectorItemProps {
  tab?: number;
  key?: string;
  item: ICountry & {
    icon?: string;
  };
  selected?: boolean;
  onSelect?: (id: string) => void;
  head?: boolean;
}

function SelectorItem(props: SelectorItemProps) {
  const cn = bem("SelectorItem");
  const itemRef = React.useRef<HTMLDivElement | null>(null);
  const iconRef = React.useRef<HTMLDivElement | null>(null);
  const titleRef = React.useRef<HTMLDivElement | null>(null);

  // Состояние на длину названия item
  const [isLong, setIsLong] = React.useState(false);

  // Изменение вида item, если выходит за границы
  React.useEffect(() => {
    itemRef.current?.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.code === "Enter" && props.onSelect) {
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
  }, [props.item]);

  const iconCreator = React.useCallback(
    (name: string) => name?.slice(0, 2).toUpperCase(),
    []
  );

  return (
    <div
      id={props.item._id}
      ref={itemRef}
      className={
        props.selected ? cn("selected") : props.head ? cn("head") : cn()
      }
      onClick={() => props.onSelect && props.onSelect(props.item._id)}
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

export default React.memo(SelectorItem);
