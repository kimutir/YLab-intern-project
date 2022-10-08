import React from "react";
import propTypes from "prop-types";
import Layout from "@src/components/layouts/layout";
import List from "@src/components/elements/list";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import { v4 as uuidv4 } from "uuid";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import ChatItem from "@src/components/chat/chat-item";

function Chat(props) {
  const store = useStore();

  const [text, setText] = React.useState("");

  const callbacks = {
    connect: React.useCallback((token) => store.get("chat").connect(token), []),
    loadInit: React.useCallback(() => store.get("chat").load(), []),
    loadMore: React.useCallback(
      (method, fromId) => store.get("chat").load(method, { fromId }),
      []
    ),
    loadFromDate: React.useCallback(
      (method, fromDate) => store.get("chat").load(method, { fromDate }),
      []
    ),
    send: React.useCallback((message, key) => {
      store.get("chat").send(message, key);
      setText("");
    }, []),
  };

  const renders = {
    message: React.useCallback((item) => <ChatItem item={item} />, []),
  };

  const select = useSelector((state) => ({
    connected: state.chat.connected,
    items: state.chat.messages,
  }));

  React.useEffect(() => {
    callbacks.connect(localStorage.getItem("token"));
  }, []);

  React.useEffect(() => {
    select.connected && !select.items.length && callbacks.loadInit();
    select.connected &&
      select.items.length &&
      callbacks.loadFromDate(
        "last",
        select.items[select.items.length - 1].dateCreate
      );
  }, [select.connected]);

  React.useEffect(() => {}, [select.items]);

  return (
    <Layout top="Chat">
      <TopContainer />
      {/* <HeadContainer /> */}
      <ToolsContainer />
      <button onClick={() => callbacks.loadMore("old", select.items[0]._id)}>
        LOAD MORE
      </button>
      <button
        onClick={() =>
          callbacks.loadFromDate("last", "2022-10-08T11:42:55.928Z")
        }
      >
        LOAD FROM DATE
      </button>
      <List items={select.items} renderItem={renders.message} />
      <form
        name="publish"
        onSubmit={(e) => {
          e.preventDefault();
          callbacks.send(text, uuidv4());
        }}
      >
        <input
          type="text"
          name="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="Отправить" />
      </form>
    </Layout>
  );
}

Chat.propTypes = {
  title: propTypes.string,
};

Chat.defaultProps = {
  title: "title",
};

export default React.memo(Chat);
