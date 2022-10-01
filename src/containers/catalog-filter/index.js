import React, { useCallback, useMemo } from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Select from "@src/components/elements/select";
import Input from "@src/components/elements/input";
import LayoutFlex from "@src/components/layouts/layout-flex";
import { categories } from "@src/store/exports";
import listToTree from "@src/utils/list-to-tree";
import treeToList from "@src/utils/tree-to-list";
import CustomSelector from "@src/components/elements/custom-selector";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    category: state.catalog.params.category,
    categories: state.categories.items,
    countries: state.countries.items,
    selectedCountry: state.countries.selected,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort, page, skip, reset) =>
        store.get("catalog").setParams({ sort, page, skip }, reset),
      []
    ),
    // Поиск
    onSearch: useCallback(
      (query, skip, page, reset) =>
        store.get("catalog").setParams({ query, skip, page }, reset),
      []
    ),
    onSearchCountries: useCallback(
      (query) => store.get("countries").setParams({ query }),
      []
    ),
    onSelect: useCallback((id) => store.get("countries").selectCountry(id), []),
    // Сброс
    onReset: useCallback(() => store.get("catalog").resetParams(), []),
    // Фильтр по категории
    onCategory: useCallback(
      (category, page, skip, reset) =>
        store.get("catalog").setParams({ category, page, skip }, reset),
      []
    ),
  };

  // Опции для полей
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
