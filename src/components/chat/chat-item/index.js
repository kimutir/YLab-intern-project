import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useSelector from "@src/hooks/use-selector";

function ChatItem(props) {
  const cn = bem("ChatItem");

  const select = useSelector((state) => ({
    id: state.session.user._id,
  }));

  return (
    <div
      className={
        props.item.author._id === select.id ? cn({ pos: "right" }) : cn()
      }
    >
      <div className={cn("top")}>
        <p className={cn("user")}> {props.item.author.profile.name}</p>
        <p className={cn("date")}> {props.item.dateCreate}</p>
      </div>
      <div className={cn("text")}>{props.item.text}</div>
    </div>
  );
}

ChatItem.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  link: propTypes.string,
  labelCurr: propTypes.string,
  labelAdd: propTypes.string,
};

ChatItem.defaultProps = {
  onSelectItem: () => {},
  onAdd: () => {},
  labelCurr: "₽",
  labelAdd: "Добавить",
};

export default React.memo(ChatItem);
