import React from "react";
import useStore from "@src/hooks/use-store";
import useInit from "@src/hooks/use-init";
import CatalogFilter from "@src/containers/catalog-filter";
import CatalogList from "@src/containers/catalog-list";
import Layout from "@src/components/layouts/layout";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import useTranslate from "@src/hooks/use-translate";

function Main() {
  const store = useStore();
  const { t } = useTranslate();

  // Загрузка стран и категорий
  useInit(
    async () => {
      await Promise.all([
        // store.get("catalog").initParams(),
        store.get("categories").load(),
        store.get("countries").setParams(),
      ]);
    },
    [],
    { backForward: true }
  );

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={t("menu.main")} />
      <ToolsContainer />
      <CatalogFilter catalog="catalog" />
      <CatalogList />
    </Layout>
  );
}

export default React.memo(Main);
