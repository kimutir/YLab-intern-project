import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const List = React.forwardRef((props, ref) => {
  const cn = bem("List");

  return (
    <div
      // onScroll={(e) => props.onScroll(e)}
      id="list"
      className={cn()}
    >
      {props.items.map((item, index) => {
        if (index + 1 === props.items.length) {
          return (
            <div key={item._id} className={cn("item")} ref={ref}>
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
});

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func,
  onScroll: propTypes.func,
};

List.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString();
  },
};

export default React.memo(List);
