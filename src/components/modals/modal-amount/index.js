import React, { useCallback } from "react";
import { useStore as useStoreRedux } from "react-redux";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import LayoutModal from "@src/components/layouts/layout-modal";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { compose } from "redux";

function ModalAmount(props) {
  const store = useStore();
  const storeRedux = useStoreRedux();
  const cn = bem("AmountModal");

  const [itemAmount, setItemAmount] = React.useState(0);

  const increase = () => {
    setItemAmount((prev) => prev + 1);
  };

  const decrease = () => {
    if (itemAmount <= 0) return;
    setItemAmount((prev) => prev - 1);
  };

  const { t } = useTranslate();
  const select = useSelector((state) => ({
    selected: state.basket.selected,
  }));
  React.useEffect(() => {
    console.log("from amount-item", props.title);
  }, []);
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => {
      if (!itemAmount) return;
      props.addToBasket(select.selected, itemAmount);
      // store.get("basket").addToBasket(select.selected, itemAmount);
      setItemAmount(0);
      props.close();
      // store.get("modals").close();
    }, [select.selected, itemAmount]),
  };

  return (
    <LayoutModal
      title={props.title}
      labelClose={t("basket.close")}
      onClose={props.close}
    >
      <div className={cn("wrapper")}>
        <div className={cn("top")}>
          <button onClick={decrease}>-</button>
          <input
            value={itemAmount}
            onChange={(e) => setItemAmount(e.target.value)}
          />
          <button onClick={increase}>+</button>
        </div>
        <div className={cn("bottom")}>
          <button onClick={callbacks.closeModal}>Отмена</button>
          <button onClick={callbacks.addToBasket}>Подтвердить</button>
        </div>
      </div>
    </LayoutModal>
  );
}

export default React.memo(ModalAmount);
