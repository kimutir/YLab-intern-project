import React from "react";
import propTypes from "prop-types";
import Layout from "@src/components/layouts/layout";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import ChatItem from "@src/components/chat/chat-item";
import ChatForm from "@src/components/chat/chat-form";
import ScrollList from "@src/components/scroll/scroll-list";

function Chat() {
  const store = useStore();
  const lastItemRef = React.useRef();
  const firstItemRef = React.useRef();
  const listRef = React.useRef();

  const [initial, setInitial] = React.useState(false);

  const select = useSelector((state) => ({
    connected: state.chat.connected,
    items: state.chat.messages,
    scroll: state.chat.scroll,
    isLast: state.chat.isLast,
    unreadMessage: state.chat.unreadMessage,
  }));

  const callbacks = {
    connect: React.useCallback((token) => store.get("chat").connect(token), []),
    close: React.useCallback(() => store.get("chat").close(), []),
    resetScroll: React.useCallback(() => store.get("chat").resetScroll(), []),
    resetTest: React.useCallback(() => store.get("chat").resetTest(), []),
    deleteAll: React.useCallback(() => store.get("chat").deleteAll(), []),
    loadInit: React.useCallback(() => store.get("chat").load(), []),
    test: React.useCallback(() => {
      lastItemRef.current.scrollIntoView(false);
    }, [lastItemRef, listRef]),
    loadFromId: React.useCallback((method, fromId) => {
      store.get("chat").load(method, { fromId });
    }, []),
    loadFromDate: React.useCallback(
      (method, fromDate) => store.get("chat").load(method, { fromDate }),
      []
    ),
  };

  const renders = {
    message: React.useCallback((item) => <ChatItem item={item} />, []),
  };

  // установка соединения с чатом
  React.useEffect(() => {
    setInitial(true);
    return () => callbacks.close();
  }, []);
  // изначальная прокрутка вниз
  React.useEffect(() => {
    initial && lastItemRef.current && callbacks.test();
    initial && lastItemRef.current && setInitial(false);
  }, [initial, select.items]);
  // первоначальная загрузка или дозагрузка
  React.useEffect(() => {
    if (select.connected) {
      if (select.items.length) {
        callbacks.loadFromDate(
          "last",
          select.items[select.items.length - 1].dateCreate
        );
      } else {
        callbacks.loadInit();
      }
    } else {
      callbacks.connect(localStorage.getItem("token"));
    }
  }, [select.connected]);

  // прокрутка вниз
  React.useEffect(() => {
    select.scroll && callbacks.test();
    select.scroll && callbacks.resetScroll();
  }, [select.scroll]);

  const optionBottom = {
    root: listRef.current,
    rootMargin: "0px 0px 20px 0px",
    threshold: 0.1,
  };
  const optionTop = {
    root: listRef.current,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.1,
  };

  const callbackBottom = React.useCallback(
    (entries, observer) => {
      if (entries[0].isIntersecting && select.unreadMessage) {
        callbacks.test();
        callbacks.resetScroll();
        observer.unobserve(lastItemRef.current);
      }
    },
    [listRef, lastItemRef, select.unreadMessage]
  );

  const callbackTop = React.useCallback(
    (entries, observer) => {
      if (entries[0].isIntersecting) {
        entries[0].target.nextSibling.scrollIntoView(true);
        listRef.current.style.overflowY = "hidden";
        callbacks.loadFromId("old", select.items[0]._id);
        observer.unobserve(firstItemRef.current);
      }
    },
    [select.items[0]]
  );

  React.useEffect(() => {
    const observerTop = new IntersectionObserver(callbackTop, optionTop);

    if (firstItemRef.current) {
      listRef.current.style.overflowY = "auto";
      observerTop?.unobserve(firstItemRef.current);
    }

    if (!select.isLast && firstItemRef.current) {
      observerTop?.observe(firstItemRef.current);
    }
  }, [select.last, select.items[0]]);

  React.useEffect(() => {
    const observerBottom = new IntersectionObserver(
      callbackBottom,
      optionBottom
    );
    if (lastItemRef.current) {
      observerBottom?.unobserve(lastItemRef.current);
    }
    lastItemRef.current && observerBottom?.observe(lastItemRef.current);
  }, [select.unreadMessage]);

  // React.useEffect(() => {
  //   console.log("from chat items", select.items);
  // }, [select.items]);

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title="Чат" />
      <ToolsContainer />
      <button onClick={callbacks.deleteAll}>click</button>
      <ScrollList
        items={select.items}
        renderItem={renders.message}
        ref={{ lastItemRef, listRef, firstItemRef }}
      />
      <ChatForm />
    </Layout>
  );
}

Chat.propTypes = {};

Chat.defaultProps = {};

export default React.memo(Chat);
