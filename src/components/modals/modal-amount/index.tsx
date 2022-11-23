import React, { useCallback } from "react";
import { useStore as useStoreRedux } from "react-redux";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import LayoutModal from "@src/components/layouts/layout-modal";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

interface ModalAmountProps {
  close: (name?: string) => void;
  addToBasket: (item: string, amount: number) => void;
  title: string;
}

function ModalAmount(props: ModalAmountProps) {
  const storeRedux = useStoreRedux();
  const cn = bem("AmountModal");

  const [itemAmount, setItemAmount] = React.useState(0);

  const { t } = useTranslate();
  const select = useSelector((state) => ({
    selected: state.basket.selected,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => {
      if (!itemAmount) return;
      if (select.selected) {
        props.addToBasket(select.selected, itemAmount);
      }
      setItemAmount(0);
      props.close("add-amount");
    }, [select.selected, itemAmount]),

    // Управление количеством товара
    decrease: useCallback(() => {
      if (itemAmount <= 0) return;
      setItemAmount((prev) => prev - 1);
    }, [itemAmount]),
    increase: useCallback(() => {
      setItemAmount((prev) => prev + 1);
    }, []),
  };

  return (
    <LayoutModal
      title={props.title}
      labelClose={t("basket.close")}
      onClose={() => props.close("add-amount")}
    >
      <div className={cn("wrapper")}>
        <div className={cn("top")}>
          <button onClick={callbacks.decrease}>-</button>
          <input
            value={itemAmount}
            onChange={(e) => setItemAmount(Number(e.target.value))}
          />
          <button onClick={callbacks.increase}>+</button>
        </div>
        <div className={cn("bottom")}>
          <button onClick={() => props.close("add-amount")}>Отмена</button>
          <button onClick={callbacks.addToBasket}>Подтвердить</button>
        </div>
      </div>
    </LayoutModal>
  );
}

export default React.memo(ModalAmount);
