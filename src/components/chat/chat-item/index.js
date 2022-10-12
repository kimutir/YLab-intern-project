import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useSelector from "@src/hooks/use-selector";

function ChatItem(props) {
  const cn = bem("ChatItem");

  React.useEffect(() => {
    // console.log(props.item.author);
  }, []);

  const options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(props.item.dateCreate);

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
        <p className={cn("userName")}> {props.item.author.profile.name}</p>
        <p className={cn("date")}>
          {date && date.toLocaleDateString("ru", options)}
        </p>
      </div>
      <div
        className={
          props.item.author._id === select.id
            ? cn("bottom", { user: "message" })
            : cn("bottom")
        }
      >
        <div
          className={
            props.item.author._id === select.id
              ? cn("message", { user: "message" })
              : cn("message")
          }
        >
          <div className={cn("avatar")}></div>
          <div className={cn("text")}>{props.item.text}</div>
        </div>
        <div className={cn("status")}>
          {props.item.status
            ? props.item.status
            : props.item.author._id === select.id && "отправлено"}
        </div>
      </div>
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
