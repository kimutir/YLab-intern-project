import React, { useCallback, useMemo } from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Select from "@src/components/elements/select";
import Input from "@src/components/elements/input";
import LayoutFlex from "@src/components/layouts/layout-flex";
import listToTree from "@src/utils/list-to-tree";
import treeToList from "@src/utils/tree-to-list";
import CustomSelector from "@src/components/elements/custom-selector";

type CatalogFilterProps = {
  catalog: string;
};

function CatalogFilter(props: CatalogFilterProps) {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state[props.catalog].params.sort as string,
    query: state[props.catalog].params.query as string,
    page: state[props.catalog].params.page as number,
    limit: state[props.catalog].params.limit as number,
    category: state[props.catalog].params.category as string,
    categories: state.categories.items,
    countries: state.countries.items,
    selectedCountry: state.countries.selected,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort: string, page: number, reset: boolean) =>
        store.get(props.catalog as "catalog").setParams({ sort, page }, reset),
      []
    ),
    // Поиск
    onSearch: useCallback(
      (query: string, page: number, reset: boolean) =>
        store.get(props.catalog as "catalog").setParams({ query, page }, reset),
      []
    ),
    onSearchCountries: useCallback(
      (query: string) => store.get("countries").setParams({ query }),
      []
    ),
    // Выбор
    onSelect: useCallback(
      (id: string) => store.get("countries").selectCountry(id),
      []
    ),
    // Сброс
    onReset: useCallback(
      () => store.get(props.catalog as "catalog").resetParams(),
      []
    ),
    // Фильтр по категории
    onCategory: useCallback(
      (category: string, page: number, reset: boolean) =>
        store
          .get(props.catalog as "catalog")
          .setParams({ category, page }, reset),
      []
    ),
  };

  // Опции для селекторов
  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),

    categories: useMemo(
      () => [
        { value: "", title: "Все" },
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: "- ".repeat(level) + item.title,
        })),
      ],
      [select.categories]
    ),
  };

  return (
    <LayoutFlex flex="start" indent="big">
      <Select
        onChange={callbacks.onCategory}
        value={select.category}
        options={options.categories}
      />
      <Select
        onChange={callbacks.onSort}
        value={select.sort}
        options={options.sort}
      />
      <Input
        onChange={callbacks.onSearch}
        onReset={callbacks.onReset}
        value={select.query}
        placeholder={"Поиск"}
        limit={select.limit}
        page={select.page}
        theme="big"
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
      <CustomSelector
        default="Выберите страну"
        value={select.countries}
        onSearch={callbacks.onSearchCountries}
        onSelect={callbacks.onSelect}
        selected={select.selectedCountry}
      ></CustomSelector>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
