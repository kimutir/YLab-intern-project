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

  // console.log("render CatalogList");

  const [load, setLoad] = React.useState(false);
  const [page, setPage] = React.useState(1);
  // console.log("page:", page);

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

  const handleScroll = React.useCallback((event) => {
    if (
      event.target.scrollHeight -
        (event.target.clientHeight + event.target.scrollTop) <
      200
    ) {
      setLoad(true);
    }
  }, []);

  const paginationFunc = async () => {
    await callbacks.onPaginate({ page });
    setPage((prev) => prev + 1);
    setLoad(false);
  };

  React.useEffect(() => {
    if (load) {
      paginationFunc();
    }
  }, [load]);

  return (
    // <Spinner active={select.waiting}>
    //   <div>
    <>
      <List
        onScroll={(e) => handleScroll(e)}
        items={select.items}
        renderItem={renders.item}
      ></List>

      <Pagination
        count={select.count}
        page={page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
      />
    </>

    //   </div>
    // </Spinner>

    // <Spinner >

    //   <Pagination
    //     count={select.count}
    //     page={page}
    //     limit={select.limit}
    //     onChange={callbacks.onPaginate}
    //   />
    // </Spinner>
  );
}

export default React.memo(CatalogList);
