import React, { useCallback } from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Pagination from "@src/components/navigation/pagination";
import Item from "@src/components/catalog/item";
import { useLocation } from "react-router-dom";
import ScrollList, { ScrollRefsType } from "@src/components/scroll/scroll-list";
import Scroll from "../scroll";
import { ICatalogItem } from "@src/store/catalog/type";

function CatalogList() {
  const store = useStore();

  const listRef = React.useRef<HTMLDivElement>(null);
  const lastItemRef = React.useRef<HTMLDivElement>(null);

  const refs = React.useRef<ScrollRefsType>({ listRef, lastItemRef });

  const location = useLocation();

  const select = useSelector((state) => ({
    catalog: state.catalog,
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    modals: state.modals.modals,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id: string, amount: number) =>
        store.get("basket").addToBasket(_id, amount),
      []
    ),
    // Пагианция
    onPaginate: useCallback(
      (page: number, reset: boolean) =>
        store.get("catalog").setParams({ page }, reset),
      []
    ),
    onReset: useCallback(() => store.get("catalog").resetCatalog(), []),
    onAdditionalLoad: useCallback(
      (skip: number, limit: number, reset: boolean) =>
        store.get("catalog").additionalLoad({ skip, limit }, reset),
      []
    ),
    // Параметры после первоначальной загрузки
    setNewParams: useCallback(
      (limit: number) => store.get("catalog").newParams({ limit }),
      []
    ),
    // Открытие модалки "Количество товара"
    onOpenAddAmount: useCallback(
      () =>
        store.get("modals").open("add-amount", {
          title: "Введите количество",
          close: (name: string) => store.get("modals").close(name),
          addToBasket: (id: string, amount: number) =>
            store.get("basket").addToBasket(id, amount),
        }),
      []
    ),
    // Добавление в корзину
    onAddSelected: useCallback(
      (id: string) => store.get("basket").addSelected(id),
      []
    ),
  };

  const renders = {
    item: useCallback(
      (item: ICatalogItem) => (
        <Item
          item={item}
          onOpenAddAmount={callbacks.onOpenAddAmount}
          onAdd={callbacks.onAddSelected}
          link={`/articles/${item._id}`}
          labelAdd={t("article.add")}
        />
      ),
      [t]
    ),
  };

  return (
    <>
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
      />

      <Scroll
        onAdditionalLoad={callbacks.onAdditionalLoad}
        onPaginate={callbacks.onPaginate}
        onReset={callbacks.onReset}
        object={select.catalog}
        target={lastItemRef}
        root={listRef}
        params={location.search}
        setNewParams={callbacks.setNewParams}
      >
        <ScrollList ref={refs} items={select.items} renderItem={renders.item} />
      </Scroll>
    </>
  );
}

export default CatalogList;
