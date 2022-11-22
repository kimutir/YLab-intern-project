import React from "react";
import numberFormat from "@src/utils/number-format";
import "./styles.css";

interface BasketTotalProps {
  t: (text: string) => string;
  sum: number;
  onOpenModalCatalog: () => void;
}

function BasketTotal(props: BasketTotalProps) {
  return (
    <div className="BasketTotal">
      <button onClick={props.onOpenModalCatalog}>Открыть каталог</button>
      <span className="BasketTotal-cell">{props.t("basket.total")}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  );
}

export default React.memo(BasketTotal);
