import React, { useCallback } from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Pagination from "@src/components/navigation/pagination";
import Item from "@src/components/catalog/item";
import { useLocation } from "react-router-dom";
import ModalAmount from "@src/components/modals/modal-amount";
import ScrollList from "@src/components/scroll/scroll-list";
import Scroll from "../scroll";

function CatalogList() {
  const store = useStore();

  const listRef = React.useRef();
  const lastItemRef = React.useRef();

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
      (_id, amount) => store.get("basket").addToBasket(_id, amount),
      []
    ),
    // Пагианция
    onPaginate: useCallback(
      (page, reset) => store.get("catalog").setParams({ page }, reset),
      []
    ),
    onAdditionalLoad: useCallback(
      (skip, limit, reset) =>
        store.get("catalog").additionalLoad({ skip, limit }, reset),
      []
    ),
    // Параметры после первоначальной загрузки
    setNewParams: useCallback(
      (limit) => store.get("catalog").newParams({ limit }),
      []
    ),
    // Открытие модалки "Количество товара"
    onOpenAddAmount: useCallback(
      () =>
        store.get("modals").open("add-amount", {
          title: "Введите количествоjjj",
          // close: store.get("modals").close,
          close: (name) => store.get("modals").close(name),
          addToBasket: (id, amount) =>
            store.get("basket").addToBasket(id, amount),
        }),
      []
    ),
    // Добавление в корзину
    onAddSelected: useCallback((id) => store.get("basket").addSelected(id), []),
  };

  const renders = {
    item: useCallback(
      (item) => (
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
        object={select.catalog}
        target={lastItemRef}
        root={listRef}
        params={location.search}
        setNewParams={callbacks.setNewParams}
      >
        <ScrollList
          ref={{ lastItemRef, listRef }}
          items={select.items}
          renderItem={renders.item}
        />
      </Scroll>
    </>
  );
}

export default CatalogList;
