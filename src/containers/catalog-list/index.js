import React, { useCallback } from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import Spinner from "@src/components/elements/spinner";
import Item from "@src/components/catalog/item";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import divisibleByFive from "@src/utils/divisible-by-five";

function CatalogList() {
  const store = useStore();

  const listRef = React.useRef();
  const lastItemRef = React.createRef();

  const location = useLocation();

  const [load, setLoad] = React.useState(false);

  const [test, setTest] = React.useState(false);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    query: state.catalog.params.query,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    isInitialLoaded: state.catalog.initialLoad.isLoaded,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    // Пагианция
    onPaginate: useCallback(
      (page, skip, limit, reset) =>
        store.get("catalog").setParams({ page, skip, limit }, reset),
      []
    ),
    setNewParams: useCallback(
      (limit, page, skip) =>
        store.get("catalog").newParams({ limit, page, skip }),
      []
    ),
    onInitialLoadItems: useCallback(
      (query) => store.get("catalog").initialLoadItems(query),
      []
    ),
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

  // loading 1st page
  React.useEffect(() => {
    callbacks.onInitialLoadItems(location.search);
  }, []);

  // scroll with IntersectionObserver
  const options = {
    root: listRef.current,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.1,
  };

  const callback = React.useCallback(
    (entries, observer) => {
      if (
        entries[0].isIntersecting &&
        lastItemRef.current &&
        select.page * select.limit < select.count
      ) {
        const list = document.querySelector("#list");

        if (
          !test &&
          lastItemRef.current?.offsetTop < list.offsetTop + list.clientHeight
        ) {
          const targetHeight = entries[0].boundingClientRect.height;
          const rootHeight = list.clientHeight;
          const initalItemsAmount = Math.ceil(rootHeight / targetHeight) + 2;
          const requestedLimit = divisibleByFive(initalItemsAmount);
          requestedLimit != select.limit &&
            callbacks.onPaginate(
              select.page,
              select.limit,
              requestedLimit - select.limit
            );
          setTest(true);
          callbacks.setNewParams(requestedLimit);
          observer.unobserve(lastItemRef.current);
        } else {
          callbacks.onPaginate(
            select.page + 1,
            select.page * select.limit,
            select.limit
          );

          observer.unobserve(lastItemRef.current);
        }
      }
    },
    [select.page, lastItemRef, select.limit, test, select.items]
  );

  // subscribe target
  React.useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (lastItemRef.current) {
      observer.unobserve(lastItemRef.current);
    }
    const list = document.querySelector("#list");
    if (!test) {
      lastItemRef.current && observer.observe(lastItemRef.current);
    } else if (
      lastItemRef.current?.offsetTop >
      list.offsetTop + list.clientHeight
    ) {
      lastItemRef.current && observer.observe(lastItemRef.current);
    }
  }, [select.items, test]);

  return (
    <>
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
        setTest={setTest}
      />

      <List
        ref={lastItemRef}
        // onScroll={handleScroll}
        items={select.items}
        renderItem={renders.item}
      />
    </>
  );
}

export default CatalogList;

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
