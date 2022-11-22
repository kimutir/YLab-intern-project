import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useSelector from "@src/hooks/use-selector";
import { Message } from "@src/store/chat/type";

interface ChatItemProps {
  item: Message & { status: boolean };
  link?: string;
  labelCurr?: string;
  labelAdd?: string;
}

function ChatItem(props: ChatItemProps) {
  const cn = bem("ChatItem");

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
          {date &&
            date.toLocaleDateString("ru", {
              weekday: "long",
              hour: "numeric",
              minute: "numeric",
            })}
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

export default React.memo(ChatItem);
