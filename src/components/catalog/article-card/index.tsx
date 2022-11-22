import React from "react";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "@src/utils/number-format";
import "./style.css";
import { IArticleData } from "@src/store/article/type";

interface ArticleCardProps {
  article: IArticleData;
  onAdd: (id: string) => void;
}

function ArticleCard({ article, onAdd }: ArticleCardProps) {
  const cn = bem("ArticleCard");

  return (
    <div className={cn()}>
      <div className={cn("description")}>{article.description}</div>
      <div className={cn("prop")}>
        <div className={cn("label")}>Страна производитель:</div>
        <div className={cn("value")}>
          {article.maidIn?.title} ({article.maidIn?.code})
        </div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>Категория:</div>
        <div className={cn("value")}>{article.category?.title}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>Год выпуска:</div>
        <div className={cn("value")}>{article.edition}</div>
      </div>
      <div className={cn("prop", { size: "big" })}>
        <div className={cn("label")}>Цена:</div>
        <div className={cn("value")}>{numberFormat(article.price)} ₽</div>
      </div>
      <button onClick={() => onAdd(article._id)}>Добавить</button>
    </div>
  );
}

export default React.memo(ArticleCard);
