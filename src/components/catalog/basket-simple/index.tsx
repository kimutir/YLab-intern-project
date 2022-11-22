import React from "react";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "@src/utils/number-format";
import "./styles.css";

interface BasketSimpleProps {
  sum: number;
  amount: number;
  onOpen: (modal: string) => void;
  t: (value: string, amount?: number) => string;
}

function BasketSimple({ sum, amount, onOpen, t }: BasketSimpleProps) {
  const cn = bem("BasketSimple");
  return (
    <div className={cn()}>
      <span className={cn("label")}>{t("basket.inBasket")}:</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${t("basket.articles", amount)} / ${numberFormat(sum)} ₽`
          : t("basket.empty")}
      </span>
      <button className="BasketSimple__button" onClick={() => onOpen("basket")}>
        {t("basket.open")}
      </button>
    </div>
  );
}

export default React.memo(BasketSimple);
