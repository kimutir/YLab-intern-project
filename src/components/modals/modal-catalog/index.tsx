import React, { useCallback } from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Pagination from "@src/components/navigation/pagination";
import Item from "@src/components/catalog/item";
import ScrollList, { ScrollRefsType } from "@src/components/scroll/scroll-list";
import LayoutModal from "@src/components/layouts/layout-modal";
import Scroll from "@src/containers/scroll";
import CatalogFilter from "@src/containers/catalog-filter";
import { ICatalogItem } from "@src/store/catalog/type";

interface ModalCatalogProps {
  closeModal: (name: string) => void;
  addToBasket: (id: string) => void;
  removeCatalog: () => void;
  onPaginate: (page: number, reset: boolean) => void;
  onAdditionalLoad: (skip: number, limit: number, reset: boolean) => void;
  onOpenAddAmount: () => void;
  setNewParams: (limit: number) => void;
  onAddSelected: (id: string) => void;
}

function ModalCatalog(props: ModalCatalogProps) {
  const store = useStore();

  const listRef = React.useRef<HTMLDivElement>(null);
  const lastItemRef = React.useRef<HTMLDivElement>(null);

  const refs = React.useRef<ScrollRefsType>({ listRef, lastItemRef });

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const onSelectItem = React.useCallback(
    (id: string) => {
      const index = selectedItems.indexOf(id);
      if (index !== -1) {
        const newItems = [...selectedItems];
        newItems.splice(index, 1);
        setSelectedItems(newItems);
      } else {
        setSelectedItems((prev) => [...prev, id]);
      }
    },
    [selectedItems]
  );

  const { t } = useTranslate();

  React.useEffect(() => {
    return () => {
      props.removeCatalog();
    };
  }, []);

  const select = useSelector((state) => ({
    catalog: state.catalog1,
    items: state.catalog1.items,
    page: state.catalog1.params.page,
    limit: state.catalog1.params.limit,
    count: state.catalog1.count,
  }));

  const onAddAll = React.useCallback(async () => {
    for (const id of selectedItems) {
      await props.addToBasket(id);
    }
    props.closeModal("catalog");
  }, [selectedItems]);
  const onReset = React.useCallback(
    () => store.get("catalog").resetCatalog(),
    []
  );

  const renders = {
    item: useCallback(
      (item: ICatalogItem) => (
        <Item
          inModal={true}
          closeModal={props.closeModal}
          selectedItems={selectedItems}
          onSelectItem={onSelectItem}
          item={item}
          onOpenAddAmount={props.onOpenAddAmount}
          link={`/articles/${item._id}`}
          onAdd={props.onAddSelected}
          labelAdd={t("article.add")}
        />
      ),
      [t, selectedItems, onSelectItem]
    ),
  };

  return (
    <LayoutModal
      title="Выберите товар"
      labelClose={t("basket.close")}
      onClose={() => props.closeModal("catalog")}
    >
      <CatalogFilter catalog="catalog1" />
      <button onClick={onAddAll}>Добавить в корзину</button>
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={props.onPaginate}
      />
      <Scroll
        onAdditionalLoad={props.onAdditionalLoad}
        onPaginate={props.onPaginate}
        setNewParams={props.setNewParams}
        object={select.catalog}
        target={lastItemRef}
        root={listRef}
        params=""
      >
        <ScrollList ref={refs} items={select.items} renderItem={renders.item} />
      </Scroll>
    </LayoutModal>
  );
}

export default React.memo(ModalCatalog);
