import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function List(props) {
  const cn = bem("List");

  console.log("render List");

  return (
    <div onScroll={props.onScroll} className={cn()}>
      {props.items.map((item) => (
        <div key={item._id} className={cn("item")}>
          {props.renderItem(item)}
          {/* <h1>{item.title}</h1> */}
        </div>
      ))}
    </div>
  );
}

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
