import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { ICatalogItem } from "@src/store/catalog/type";

interface ScrollListProps {
  items: ICatalogItem[];
  renderItem: (item: ICatalogItem) => React.ReactNode;
}
export type ScrollRefsType = {
  lastItemRef: React.RefObject<HTMLDivElement>;
  firstItemRef?: React.RefObject<HTMLDivElement>;
  listRef: React.RefObject<HTMLDivElement>;
};

const ScrollList = React.forwardRef<ScrollRefsType, ScrollListProps>(
  (props, ref) => {
    const cn = bem("ScrollList");

    if (typeof ref === "object" && ref?.current) {
      const { listRef, lastItemRef, firstItemRef } = ref?.current;

      return (
        <div className={cn()} ref={listRef}>
          {props.items.map((item, index: number) => {
            if (index === 0) {
              return (
                <div key={item._id} className={cn("item")} ref={firstItemRef}>
                  {props.renderItem(item)}
                </div>
              );
            }
            if (index + 1 === props.items.length) {
              return (
                <div key={item._id} className={cn("item")} ref={lastItemRef}>
                  {props.renderItem(item)}
                </div>
              );
            }
            return (
              <div key={item._id} className={cn("item")}>
                {props.renderItem(item)}
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
);

export default React.memo(ScrollList);
