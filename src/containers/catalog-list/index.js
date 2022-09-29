import React, { useCallback } from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import Spinner from "@src/components/elements/spinner";
import Item from "@src/components/catalog/item";

function CatalogList() {
  const store = useStore();

  const listRef = React.useRef();
  const lastItemRef = React.createRef();

  const [load, setLoad] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    // Пагианция
    onPaginate: useCallback((page) => store.get("catalog").setParams(page), []),
    getCatalog: useCallback(() => store.get("catalog").initParams(), []),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          link={`/articles/${item._id}`}
          labelAdd={t("article.add")}
        />
      ),
      [t]
    ),
  };

  // scroll with element measures
  // const handleScroll = React.useCallback((event) => {
  //   if (
  //     event.target.scrollHeight -
  //       (event.target.clientHeight + event.target.scrollTop) <
  //     200
  //   ) {
  //     setLoad(true);
  //   }
  // }, []);

  // const paginationFunc = React.useCallback(async () => {
  //   await callbacks.onPaginate({ page });
  //   setPage((prev) => prev + 1);
  //   setLoad(false);
  // }, [page]);

  // loading items
  // React.useEffect(() => {
  //   if (load) {
  //     paginationFunc();
  //   }
  // }, [load]);

  // scroll with IntersectionObserver
  const options = {
    root: listRef.current,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.1,
  };

  const callback = React.useCallback(
    (entries, observer) => {
      if (entries[0].isIntersecting) {
        callbacks.onPaginate({ page });
        setPage((prev) => prev + 1);
        observer.disconnect();
      }
    },
    [page]
  );

  const observer = new IntersectionObserver(callback, options);

  // subscribe target
  React.useEffect(() => {
    lastItemRef.current && observer.observe(lastItemRef.current);
  }, [select.items]);

  return (
    <>
      <List
        ref={lastItemRef}
        // onScroll={handleScroll}
        items={select.items}
        renderItem={renders.item}
      />

      <Pagination
        count={select.count}
        page={page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
      />
    </>
  );
}

export default React.memo(CatalogList);
