import React, { useCallback } from "react";
import numberFormat from "@src/utils/number-format";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./styles.css";
import { IArticleData } from "@src/store/article/type";

interface AmountItem {
  amount: number;
}

interface ItemBasketProps {
  item: IArticleData & AmountItem;
  link: string;
  onRemove: (id: string) => void;
  onLink: () => void;
  labelDelete: string;
  labelUnit: string;
  labelCurr?: string;
}

function ItemBasket({
  item,
  link,
  onRemove,
  onLink,
  labelDelete,
  labelUnit,
  labelCurr,
}: ItemBasketProps) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: useCallback(() => onRemove(item._id), [onRemove, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        {link ? (
          <Link onClick={onLink} to={link}>
            {item.title}
          </Link>
        ) : (
          item.title
        )}
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>
          {numberFormat(item.price)} {labelCurr}
        </div>
        <div className={cn("cell")}>
          {numberFormat(item.amount || 0)} {labelUnit}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{labelDelete}</button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ItemBasket);
