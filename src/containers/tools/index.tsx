import React, { useCallback, useMemo } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Menu from "@src/components/navigation/menu";
import BasketSimple from "@src/components/catalog/basket-simple";
import LayoutFlex from "@src/components/layouts/layout-flex";
import actionsModals from "@src/store-redux/modals/actions";

function ToolsContainer() {
  // const storeRedux = useStoreRedux();
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Открытие корзины
    openModal: useCallback(() => {
      store.get("modals").open("basket");
      // storeRedux.dispatch(actionsModals.open('basket'));
    }, []),
  };

  // Ссылки на другие страницы
  const options = {
    menu: useMemo(
      () => [
        { key: 1, title: t("menu.main"), link: "/" },
        { key: 2, title: t("chat"), link: "/chat" },
        { key: 3, title: t("canvas"), link: "/drawfun" },
      ],
      [t]
    ),
  };

  return (
    <LayoutFlex flex="between" indent="big">
      <Menu items={options.menu} />
      <BasketSimple
        onOpen={callbacks.openModal}
        amount={select.amount}
        sum={select.sum}
        t={t}
      />
    </LayoutFlex>
  );
}

export default React.memo(ToolsContainer);
