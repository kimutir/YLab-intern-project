import React, { useCallback } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import { useParams } from "react-router-dom";
import useInit from "@src/hooks/use-init";
import useTranslate from "@src/hooks/use-translate";
import ArticleCard from "@src/components/catalog/article-card";
import Spinner from "@src/components/elements/spinner";
import Layout from "@src/components/layouts/layout";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  // загрузка товаров
  useInit(async () => {
    if (params.id) await store.get("article").load(params.id);
    // storeRedux.dispatch(actionsArticle.load(params.id));
  }, [params.id]);

  // const select = useSelectorRedux(
  //   (state) => ({
  //     article: state.article.data,
  //     waiting: state.article.waiting,
  //   }),
  //   shallowEqual
  // );

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id: string) => store.get("basket").addToBasket(_id),
      []
    ),
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ""} />
      <ToolsContainer />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
