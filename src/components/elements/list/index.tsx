import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { IBasketItem } from "@src/store/basket/type";

interface ListProps {
  items: IBasketItem[];
  renderItem: (item: IBasketItem) => React.ReactNode;
}

const List = (props: ListProps) => {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {props.items.map((item) => {
        return (
          <div key={item._id} className={cn("item")}>
            {props.renderItem(item)}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(List);
