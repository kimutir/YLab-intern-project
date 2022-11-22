import React from "react";
import { cn as bem } from "@bem-react/classname";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";

function ChatForm() {
  const store = useStore();
  const cn = bem("ChatForm");
  const [text, setText] = React.useState("");

  const select = useSelector((state) => ({
    id: state.session.user._id,
  }));

  const callbacks = {
    send: React.useCallback(
      (text: string, _key: string) => {
        if (!text) return;
        store.get("chat").load("post", { text, _key });
        setText("");
      },
      [text]
    ),
    postMessage: React.useCallback(
      (key: string, text: string, id: string) => {
        store.get("chat").postMessage(key, text, id);
      },
      [text]
    ),
  };

  const onHandleSubmit = (key: string, text: string, id: string) => {
    if (!text) return;
    callbacks.postMessage(key, text, id);
    callbacks.send(text, key);
  };

  return (
    <form
      className={cn()}
      onSubmit={(e) => {
        e.preventDefault();
        onHandleSubmit(uuidv4(), text, select.id);
      }}
    >
      <input
        className={cn("input")}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}

export default React.memo(ChatForm);
