import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import numberFormat from "@src/utils/number-format";
import "./style.css";
import { IArticleData } from "@src/store/article/type";

interface ItemProps<T> {
  item: T;
  onOpenAddAmount: () => void;
  onAdd: (id: string) => void;
  link: string;
  labelAdd: string;
  onSelectItem?: (id: string) => void;
  closeModal?: (name: string) => void;
  inModal?: boolean;
  selectedItems?: any;
  labelCurr?: string;
}

function Item<T extends IArticleData>(props: ItemProps<T>) {
  const cn = bem("Item");

  const callbacks = {
    // Добавление товара в корзину
    onAdd: useCallback(
      (e) => props.onAdd(props.item._id),
      [props.onAdd, props.item]
    ),
    onSelectItem: useCallback(() => {
      if (props.onSelectItem) {
        props.onSelectItem(props.item._id);
      }
    }, [props.onSelectItem, props.item]),
    onOpenAddAmount: useCallback((e) => {
      e.stopPropagation();
      props.onAdd(props.item._id);
      props.onOpenAddAmount();
    }, []),
    onItemDescription: useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      if (props.inModal) {
        if (props.closeModal) {
          props.closeModal("catalog");
          props.closeModal("basket");
        }
      }
    }, []),
  };

  return (
    <div className={cn()} onClick={callbacks.onSelectItem}>
      <div className={cn("title")}>
        {props.link ? (
          <Link to={props.link} onClick={(e) => callbacks.onItemDescription(e)}>
            {props.item.title}
          </Link>
        ) : (
          props.item.title
        )}
      </div>
      <div className={cn("right")}>
        <div className={cn("price")}>
          {props.selectedItems?.includes(props.item._id) && <p>выбрано</p>}
          {numberFormat(props.item.price)} {props.labelCurr}
        </div>
        <button onClick={(e) => callbacks.onOpenAddAmount(e)}>
          {props.labelAdd}
        </button>
      </div>
    </div>
  );
}

export default React.memo(Item) as typeof Item;
