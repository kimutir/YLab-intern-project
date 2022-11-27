import React from "react";
import Layout from "@src/components/layouts/layout";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import ChatItem from "@src/components/chat/chat-item";
import ChatForm from "@src/components/chat/chat-form";
import ScrollList, { ScrollRefsType } from "@src/components/scroll/scroll-list";
import useTranslate from "@src/hooks/use-translate";

function Chat() {
  const { t } = useTranslate();
  const store = useStore();
  const lastItemRef = React.useRef<HTMLDivElement>(null);
  const firstItemRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const refs = React.useRef<ScrollRefsType>({
    lastItemRef,
    firstItemRef,
    listRef,
  });

  const [initial, setInitial] = React.useState(false);

  const select = useSelector((state) => ({
    connected: state.chat.connected,
    items: state.chat.messages,
    scroll: state.chat.scroll,
    isLast: state.chat.isLast,
    unreadMessage: state.chat.unreadMessage,
  }));

  const callbacks = {
    connect: React.useCallback(
      (token: string) => store.get("chat").connect(token),
      []
    ),
    close: React.useCallback(() => store.get("chat").close(), []),
    resetScroll: React.useCallback(() => store.get("chat").resetScroll(), []),
    loadInit: React.useCallback(() => store.get("chat").load(), []),
    scrollBottom: React.useCallback(() => {
      lastItemRef.current?.scrollIntoView(false);
    }, [lastItemRef]),
    loadFromId: React.useCallback((method: string, fromId: string) => {
      store.get("chat").load(method, { fromId });
    }, []),
    loadFromDate: React.useCallback(
      (method: string, fromDate: string) =>
        store.get("chat").load(method, { fromDate }),
      []
    ),
  };

  const renders = {
    message: React.useCallback((item) => <ChatItem item={item} />, []),
  };

  // Установка соединения с чатом
  React.useEffect(() => {
    setInitial(true);
    return () => callbacks.close();
  }, []);

  // Первоначальная прокрутка вниз
  React.useEffect(() => {
    initial && lastItemRef.current && callbacks.scrollBottom();
    initial && lastItemRef.current && setInitial(false);
  }, [initial, select.items]);

  // Первоначальная загрузка или дозагрузка
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
      callbacks.connect(localStorage.getItem("token")!);
    }
  }, [select.connected]);

  // Прокрутка вниз
  React.useEffect(() => {
    select.scroll && callbacks.scrollBottom();
    select.scroll && callbacks.resetScroll();
  }, [select.scroll]);

  const optionBottom = {
    root: listRef.current,
    rootMargin: "0px 0px 20px 0px",
  };
  const optionTop = {
    root: listRef.current,
    rootMargin: "0px 0px 0px 0px",
  };

  // Observer на прокрутку вниз, если пришло новое сообщение
  const callbackBottom: IntersectionObserverCallback = React.useCallback(
    (entries, observer) => {
      if (entries[0].isIntersecting && select.unreadMessage) {
        callbacks.scrollBottom();
        callbacks.resetScroll();
        if (lastItemRef.current) observer.unobserve(lastItemRef.current);
      }
    },
    [listRef, lastItemRef, select.unreadMessage]
  );

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

  // Observer на загрузку сообщений при прокрутке вверх
  const callbackTop: IntersectionObserverCallback = React.useCallback(
    (entries, observer) => {
      if (entries[0].isIntersecting) {
        const next = entries[0].target.nextSibling as HTMLElement;
        next.scrollIntoView(true);
        if (listRef.current) listRef.current.style.overflowY = "hidden";
        callbacks.loadFromId("old", select.items[0]._id);
        if (firstItemRef.current) observer.unobserve(firstItemRef.current);
      }
    },
    [select.items[0]]
  );

  React.useEffect(() => {
    const observerTop = new IntersectionObserver(callbackTop, optionTop);

    if (firstItemRef.current) {
      if (listRef.current) listRef.current.style.overflowY = "auto";
      observerTop?.unobserve(firstItemRef.current);
    }

    if (!select.isLast && firstItemRef.current) {
      observerTop?.observe(firstItemRef.current);
    }
  }, [select.isLast, select.items[0]]);

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={t("chat")} />
      <ToolsContainer />
      <ScrollList
        items={select.items}
        renderItem={renders.message}
        ref={refs}
      />
      <ChatForm />
    </Layout>
  );
}

export default React.memo(Chat);
