import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface Props {
  items: any;
  renderItem: any;
}
export type ScrollRefsType = {
  lastItemRef: React.RefObject<HTMLDivElement>;
  firstItemRef?: React.RefObject<HTMLDivElement>;
  listRef: React.RefObject<HTMLDivElement>;
};
const ScrollList = React.forwardRef<ScrollRefsType, Props>((props, ref) => {
  const cn = bem("ScrollList");

  if (typeof ref === "object") {
    return (
      <div className={cn()} ref={ref?.current?.listRef}>
        {props.items.map((item, index: number) => {
          if (index === 0) {
            return (
              <div
                key={item._id}
                className={cn("item")}
                ref={ref?.current?.firstItemRef}
              >
                {props.renderItem(item)}
              </div>
            );
          }
          if (index + 1 === props.items.length) {
            return (
              <div
                key={item._id}
                className={cn("item")}
                ref={ref?.current?.lastItemRef}
              >
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
    return <></>;
  }
});

// ScrollList.propTypes = {
//   items: propTypes.arrayOf(propTypes.object).isRequired,
//   renderItem: propTypes.func,
// };

// ScrollList.defaultProps = {
//   items: [],
//   renderItem: (item) => {
//     return item.toString();
//   },
// };

export default React.memo(ScrollList);
