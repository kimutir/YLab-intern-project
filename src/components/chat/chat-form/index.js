import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import numberFormat from "@src/utils/number-format";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: useCallback(
      (e) => props.onAdd(props.item._id),
      [props.onAdd, props.item]
    ),
    onSelectItem: useCallback(() => {
      props.onSelectItem(props.item._id);
    }, [props.onSelectItem, props.item]),
    onOpenAddAmount: useCallback((e) => {
      e.stopPropagation();
      props.onAdd(props.item._id);
      props.onOpenAddAmount();
    }, []),
    onItemDescription: useCallback((e) => {
      e.stopPropagation();
      // тупое решение
      props.closeModal();
      props.closeModal();
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

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  link: propTypes.string,
  labelCurr: propTypes.string,
  labelAdd: propTypes.string,
};

Item.defaultProps = {
  onSelectItem: () => {},
  onAdd: () => {},
  labelCurr: "₽",
  labelAdd: "Добавить",
};

export default React.memo(Item);
