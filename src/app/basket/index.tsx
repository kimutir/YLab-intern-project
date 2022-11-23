import React, { useCallback } from "react";
import { useStore as useStoreRedux } from "react-redux";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import BasketTotal from "@src/components/catalog/basket-total";
import LayoutModal from "@src/components/layouts/layout-modal";
import ItemBasket from "@src/components/catalog/item-basket";
import List from "@src/components/elements/list";
import { IBasketItem } from "@src/store/basket/type";

function Basket() {
  const store = useStore();
  const storeRedux = useStoreRedux();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Закрытие модалки
    closeModal: useCallback(() => {
      store.get("modals").close("basket");
    }, []),
    // Открытие каталога внутри корзины
    onOpenModalCatalog: useCallback(() => {
      store.newState("catalog", "catalog1");
      store.get("modals").open("catalog", {
        closeModal: (name: string) => store.get("modals").close(name),
        addToBasket: (_id: string, amount: number) =>
          store.get("basket").addToBasket(_id, amount),
        onPaginate: (page: number, reset: boolean) =>
          store.get("catalog1").setParams({ page }, reset),
        setNewParams: (limit: number) =>
          store.get("catalog1").newParams({ limit }),

        // Открытие модалки "Количество товара"
        onOpenAddAmount: () =>
          store.get("modals").open("add-amount", {
            title: "Введите количество",
            close: () => store.get("modals").close("add-amount"),
            addToBasket: (id: string, amount: number) =>
              store.get("basket").addToBasket(id, amount),
          }),
        onAdditionalLoad: (skip: number, limit: number, reset: boolean) =>
          store.get("catalog1").additionalLoad({ skip, limit }, reset),
        onAddSelected: (id: string) => store.get("basket").addSelected(id),
        removeCatalog: () => store.removeState("catalog1"),
      });
    }, []),
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id: string) => store.get("basket").removeFromBasket(_id),
      []
    ),
  };

  const renders = {
    itemBasket: useCallback(
      (item: IBasketItem) => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={callbacks.closeModal}
          labelUnit={t("basket.unit")}
          labelDelete={t("basket.delete")}
        />
      ),
      []
    ),
  };

  return (
    <LayoutModal
      title={t("basket.title")}
      labelClose={t("basket.close")}
      onClose={callbacks.closeModal}
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal
        sum={select.sum}
        t={t}
        onOpenModalCatalog={callbacks.onOpenModalCatalog}
      />
    </LayoutModal>
  );
}

export default React.memo(Basket);
