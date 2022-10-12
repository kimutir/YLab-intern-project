import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const ScrollList = React.forwardRef((props, ref) => {
  const cn = bem("ScrollList");

  // console.log(props.items);

  return (
    <div className={cn()} ref={ref.listRef}>
      {props.items.map((item, index) => {
        if (index === 0) {
          return (
            <div
              key={item._id}
              className={cn("item")}
              ref={ref.firstItemRef && ref.firstItemRef}
            >
              {props.renderItem(item)}
            </div>
          );
        }
        if (index + 1 === props.items.length) {
          return (
            <div key={item._id} className={cn("item")} ref={ref.lastItemRef}>
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

ScrollList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func,
};

ScrollList.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString();
  },
};

export default React.memo(ScrollList);
