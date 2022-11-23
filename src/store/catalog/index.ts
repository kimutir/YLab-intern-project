import StateModule from "@src/store/module";
import qs from "@src/utils/search-params";
import diff from "@src/utils/diff";
import { ICatalog, IParams, IValidParams } from "./type";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): ICatalog {
    return {
      items: [],
      selectedItems: [],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        category: "",
      },

      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из query string адреса
   * @param params
   * @return {Promise<void>}
   */
  async initParams(params: IParams | {} = {}): Promise<void> {
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать толкьо нужные
    const urlParams = qs.parse(window.location.search);
    let validParams: IValidParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.sort) validParams.sort = urlParams.sort as string;
    if (urlParams.query) validParams.query = urlParams.query as string;
    if (urlParams.category) validParams.category = urlParams.category as string;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...validParams, ...params };
    // Установка параметров и подгрузка данных
    await this.setParams(newParams, true);
  }

  /**
   * Сброс параметров к начальным
   */
  async resetParams(params: IParams | {} = {}): Promise<void> {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...params };
    // Установк параметров и подгрузка данных
    await this.setParams(newParams);
  }

  /**
   * Устанвока параметров и загрузка списка товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделаит новую запис в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(
    params: IParams | {} = {},
    resetItems: boolean = false,
    historyReplace: boolean = false
  ): Promise<void> {
    const newParams: IParams = { ...this.getState().params, ...params };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params: newParams,
        items: resetItems ? [] : this.getState().items,
        waiting: true,
      },
      "Смена параметров каталога"
    );

    const apiParams = diff(
      {
        limit: newParams.limit,
        skip: (newParams.page - 1) * newParams.limit,
        fields: "items(*),count",
        sort: newParams.sort,
        search: {
          query: newParams.query, // search[query]=text
          category: newParams.category, // -> search[category]=id
        },
      },
      { skip: 0, search: { query: "", category: "" }, limit: 10 }
    );

    // ?search[query]=text&search[category]=id
    const json = await this.services.api.request({
      url: `/api/v1/articles${qs.stringify(apiParams)}`,
    });

    // Установка полученных данных и сброс признака загрузки
    this.setState(
      {
        ...this.getState(),
        items: [...this.getState().items, ...json.result.items],
        count: json.result.count,
        waiting: false,
      },
      "Обновление списка товара"
    );
    // Запоминаем параметры в URL, которые отличаются от начальных
    let queryString = qs.stringify(diff(newParams, this.initState().params));
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  }

  chooseItem(id: string) {
    this.setState({
      ...this.getState(),
      selectedItems: [...this.getState().selectedItems, id],
    });
  }

  newParams(params: { limit: number }) {
    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params: {
          ...this.getState().params,
          limit: params.limit,
        },
      },
      "Смена параметров каталога"
    );
  }

  resetCatalog() {
    this.setState({
      ...this.initState(),
    });
  }

  async additionalLoad(
    params = {},
    resetItems = false,
    historyReplace = false
  ) {
    const newParams = { ...this.getState().params, ...params };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        // params: resetItems ? { ...newParams, page: 1 } : newParams,
        items: resetItems ? [] : this.getState().items,
        waiting: true,
      },
      "Смена параметров каталога"
    );

    const apiParams = diff(
      {
        limit: newParams.limit,
        skip: newParams.skip,
        fields: "items(*),count",
        sort: newParams.sort,
        search: {
          query: newParams.query, // search[query]=text
          category: newParams.category, // -> search[category]=id
        },
      },
      { skip: 0, search: { query: "", category: "" }, limit: 10 }
    );

    // ?search[query]=text&search[category]=id
    const json = await this.services.api.request({
      url: `/api/v1/articles${qs.stringify(apiParams)}`,
    });

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      items: [...this.getState().items, ...json.result.items],
      // count: json.result.count,
      waiting: false,
    });
    // Запоминаем параметры в URL, которые отличаются от начальных
    const paramsAfter = { ...newParams, limit: newParams.limit + 10 };
    let queryString = qs.stringify(diff(paramsAfter, this.initState().params));
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  }
}

export default CatalogState;
