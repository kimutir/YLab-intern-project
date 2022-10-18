import React from "react";
import propTypes from "prop-types";
import Layout from "@src/components/layouts/layout";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import ChatForm from "@src/components/chat/chat-form";
import ScrollList from "@src/components/scroll/scroll-list";

function Draw() {
  return (
    <Layout>
      <HeadContainer title="Чат" />
      <ToolsContainer />
      <ScrollList
        items={select.items}
        renderItem={renders.message}
        ref={{ lastItemRef, listRef, firstItemRef }}
      />
      <ChatForm />
    </Layout>
  );
}

Draw.propTypes = {};

Draw.defaultProps = {};

export default React.memo(Draw);
